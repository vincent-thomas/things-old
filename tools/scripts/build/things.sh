export PATH="${PATH}:./node_modules/.bin"
cd apps/things

rm -rf ./.astro
rm -rf  ../../dist/apps/things/*

astro build
