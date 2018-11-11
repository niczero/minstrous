package Sampler;
use Mojolicious -base;
use 5.014;

our $VERSION = 0.041;

use Mojo::Util 'md5_sum';

our $Name = __PACKAGE__;

sub startup { shift->set_up->add_routes }

sub set_up {
  my ($self) = @_;
  die "Best not run as root\n" unless $< and $>;

  push @{$self->commands->namespaces}, $Name .'::Command';
  my $config = $self->plugin(Config =>
      {file => $self->home->child('config/app.conf')});

  $self->plugin('Log::Access');
  $self->plugin('RenderFile');
  $self->plugin('Reloader') if $self->mode eq 'development';

  $self->defaults(layout => 'general', module => 'main');
  my $instance = qx(uname -a) . qx(pwd) . $Name . substr $self->mode, 0, 3;
  $self->secrets([ map md5_sum sprintf('%s%s%u%u',
      $instance, $_, (localtime)[5,7]), @{delete $config->{secrets}} ]);
  $self->sessions->default_expiration($config->{expiration})
    ->cookie_name(lc $Name);

  return $self;
}

sub add_routes {
  my ($self) = @_;
  my $r = $self->routes;

  $r->get('/' => sub { $_[0]->redirect_to($_[0]->url_with('main')) })
    ->name('base');
  $r->get($_) for qw(main about dashboard);
  $r->get('/theme/:theme')->to('Profile#theme')->name('theme');

  return $self;
}

1;
