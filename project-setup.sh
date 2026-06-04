#! /bin/zsh
deno init
rm *.ts
touch main.js
mkdir src test data

config='{
  "tasks": {
    "dev": "deno run --watch main.js",
    "test": "deno test -A",
    "test:watch": "deno test -A --watch",
    "test:coverage": "deno test -A --coverage",
    "coverage": "deno coverage"
  },
  "imports": {
    "@std/assert": "jsr:@std/assert@1",
    "@std/testing": "jsr:@std/testing@^1.0.16"
  }
}'

echo $config | cat > deno.json