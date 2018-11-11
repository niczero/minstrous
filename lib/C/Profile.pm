package C::Profile;
use Mojolicious::Controller -base;

our $VERSION = 0.001;

use Mojo::File;

sub theme {
  my ($self) = @_;
  my $theme = $self->stash('theme');
  $self->stash(layout => undef);

  my $pattern = qr/app-${theme}\..+\.css$/;
  my $filename = $self->app->home->child(qw(static css))->list->grep($pattern);
  return $self->reply->not_found unless @{$filename // []};

  $self->render_file(filepath => $filename->[0], format => 'css',
      content_disposition => 'inline');
}
