requires perl => 5.014;
requires 'IO::Socket::SSL' => 2.01;  # bin
requires 'Net::SSLeay';  # bin

requires Mojolicious => 8;
requires 'Mojolicious::Plugin::Authentication';
requires 'Mojolicious::Plugin::Log::Access';
requires 'Mojolicious::Plugin::Log::Timestamp';
requires 'Mojolicious::Plugin::RenderFile';

requires Mojar => 2;

requires 'Compress::Zlib' => 0;
requires 'Session::Token' => 1.50;

recommends 'Net::DNS::Native';  # bin

on develop => sub {
  requires 'Mojolicious::Plugin::Reloader';
  requires 'Mojolicious::Plugin::TextExceptions';
};

on test => sub {
  requires 'Test::More';
};
