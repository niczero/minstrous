package Sampler;
use Mojolicious -base;
use 5.014;

our $VERSION = 0.011;

use Mojo::Util 'md5_sum';

our $Name = __PACKAGE__;

sub startup {
  my ($self) = @_;
  die "Should not be run as root\n" unless $< and $>;
  my $home = $self->home;

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

  my $r = $self->routes;
  $r->get('/' => sub { $_[0]->redirect_to($_[0]->url_with('main')) })
    ->name('base');
  $r->get('/main')->to(template => 'main')->name('main');
  $r->get('/bootstrap')->to(template => 'bootstrap-vue')->name('bootstrap');
}

1;
