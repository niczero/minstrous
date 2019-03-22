# ============
# scaffold
# ============
use Mojo::Base -strict;
use Test::More;

# Disable IPv6 and libev
BEGIN {
  $ENV{MOJO_NO_IPV6} = 1;
  $ENV{MOJO_REACTOR} = 'Mojo::Reactor::Poll';
}
use Test::Mojo;

use Mojar::Config;

my $script = './bin/minstrous';
ok my $config = Mojar::Config->load('./config/app.conf'), 'loaded config';
my $suffix = $config->{path_base_suffix} // '';  # eg '-uat'
require $script . $suffix;

my $t = Test::Mojo->new('Minstrous');

my $url = Mojo::URL->new('/');
$t->ua->max_redirects(0);
$t->get_ok($url)
  ->status_is(302);

$t->ua->max_redirects(1);
$t->get_ok($url)
  ->status_is(200)
  ->text_like('header.barred__topbar div.toolbar h2' => qr/Main/);

$url->path('/minstrous');
$t->ua->max_redirects(0);
$t->get_ok($url)
  ->status_is(302);

$t->ua->max_redirects(1);
$t->get_ok($url)
  ->status_is(200)
  ->text_like('header.barred__topbar div.toolbar h2' => qr/Main/);

$url->path($url->path .'/main');
$t->get_ok($url)
  ->status_is(200)
  ->text_like('header.barred__topbar div.toolbar h2' => qr/Main/)
  ->text_like('nav.barred__sidebar a.menu__link.active' => qr/Main/);

$url->path('about');
$t->get_ok($url)
  ->status_is(200)
  ->text_like('header.barred__topbar div.toolbar h2' => qr/About/)
  ->text_like('nav.barred__sidebar a.menu__link.active' => qr/About/);

done_testing();
