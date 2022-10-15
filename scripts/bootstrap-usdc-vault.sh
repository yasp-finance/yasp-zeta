echo "BgxfHJDzm44T7XG68MYKx7YisTjZu73tVovyZSjJMpmw HPnqfiRSVvuBjfHN9ah4Kecb6J9et2UTnNgUwtAJdV26 100000000 0.05"
ANCHOR_WALLET=~/.config/solana/id.json npm run cli create-vault
spl-token create-account EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v -ul
spl-token mint EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v 100000000 -ul
echo "20000000"
ANCHOR_WALLET=~/.config/solana/id.json npm run cli deposit
spl-token accounts --url localhost --owner 2MJzcLSg1UoLJ23SvASDkvg1KUYiVxATfqvdqpymU9cN
