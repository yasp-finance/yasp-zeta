// TODO: https://github.com/solana-labs/solana/issues/19549
#[macro_export]
macro_rules! ratio {
  ($x:expr, $a:expr, $b:expr) => {
    $x.to_u128().unwrap()
      .checked_mul($a.into()).unwrap()
      .checked_div($b.into()).unwrap()
      .to_u64()
  };
}

#[macro_export]
macro_rules! vault_seeds {
  ($vault: expr) => {
    &[
      b"vault" as &[u8],
      &$vault.reserve.to_bytes(),
      &$vault.zeta_group.to_bytes(),
      &$vault.authority.to_bytes(),
      &[$vault.bump],
    ]
  };
}

#[macro_export]
macro_rules! executor_seeds {
  ($vault: expr) => {
    &[
      b"executor" as &[u8],
      &$vault.key().to_bytes(),
      &[$vault.executor_bump],
    ]
  };
}
