export type VaultZeta = {
  "version": "0.1.0",
  "name": "vault_zeta",
  "instructions": [
    {
      "name": "initialize",
      "accounts": [
        {
          "name": "vault",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "sharesMint",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "executor",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "collateralVault",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "underlyingVault",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "usdcVault",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "reserve",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "authority",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "marginAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "zetaGroup",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "zetaProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "rent",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "depositLimit",
          "type": "u64"
        },
        {
          "name": "managementFeeBps",
          "type": "u64"
        }
      ]
    },
    {
      "name": "deposit",
      "accounts": [
        {
          "name": "userShares",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "userTokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "userAccount",
          "isMut": false,
          "isSigner": true
        },
        {
          "name": "vault",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "collateralVault",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "executor",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "sharesMint",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "reserveLiquiditySupply",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "reserveCollateralMint",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "lendingMarket",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "lendingMarketAuthority",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "reserve",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "lendingProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "amountIn",
          "type": "u64"
        }
      ]
    },
    {
      "name": "withdraw",
      "accounts": [
        {
          "name": "userShares",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "userTokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "userAccount",
          "isMut": false,
          "isSigner": true
        },
        {
          "name": "vault",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "executor",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "sharesMint",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "collateralVault",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "reserveLiquiditySupply",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "reserveCollateralMint",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "lendingMarket",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "lendingMarketAuthority",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "reserve",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "lendingProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "amountOut",
          "type": "u64"
        }
      ]
    },
    {
      "name": "initOpenOrders",
      "accounts": [
        {
          "name": "vault",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "executor",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "authority",
          "isMut": false,
          "isSigner": true
        },
        {
          "name": "state",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "zetaGroup",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "dexProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "openOrders",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "marginAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "market",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "serumAuthority",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "openOrdersMap",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "rent",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "zetaProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    },
    {
      "name": "harvestYield",
      "accounts": [
        {
          "name": "vault",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "executor",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "authority",
          "isMut": false,
          "isSigner": true
        },
        {
          "name": "collateralVault",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "underlyingVault",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "reserveLiquiditySupply",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "reserveCollateralMint",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "lendingMarket",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "lendingMarketAuthority",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "reserve",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "lendingProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    },
    {
      "name": "swapToUsdc",
      "accounts": [
        {
          "name": "vault",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "executor",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "authority",
          "isMut": false,
          "isSigner": true
        },
        {
          "name": "whirlpool",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "underlyingVault",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "usdcVault",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenVaultA",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenVaultB",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tickArray0",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tickArray1",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tickArray2",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "oracle",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "poolProgramId",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    },
    {
      "name": "swapToUnderlying",
      "accounts": [
        {
          "name": "vault",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "executor",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "authority",
          "isMut": false,
          "isSigner": true
        },
        {
          "name": "whirlpool",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "underlyingVault",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "usdcVault",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenVaultA",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenVaultB",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tickArray0",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tickArray1",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tickArray2",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "oracle",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "poolProgramId",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    },
    {
      "name": "reinvestZeta",
      "accounts": [
        {
          "name": "vault",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "executor",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "authority",
          "isMut": false,
          "isSigner": true
        },
        {
          "name": "usdcVault",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "zetaGroup",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "zetaVault",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "marginAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "socializedLossAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "state",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "greeks",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "zetaProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    },
    {
      "name": "bidOrder",
      "accounts": [
        {
          "name": "vault",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "executor",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "authority",
          "isMut": false,
          "isSigner": true
        },
        {
          "name": "oracle",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "zetaGroup",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "zetaVault",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "marginAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "socializedLossAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "state",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "market",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "requestQueue",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "eventQueue",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "bids",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "asks",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "coinVault",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "pcVault",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "coinWallet",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "pcWallet",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "dexProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "serumAuthority",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "greeks",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "openOrders",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "marketNode",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "marketMint",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "mintAuthority",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "rent",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "zetaProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    },
    {
      "name": "redeemZeta",
      "accounts": [
        {
          "name": "vault",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "executor",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "authority",
          "isMut": false,
          "isSigner": true
        },
        {
          "name": "usdcVault",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "oracle",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "zetaGroup",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "zetaVault",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "marginAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "socializedLossAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "state",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "greeks",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "zetaProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "amountOut",
          "type": "u64"
        }
      ]
    },
    {
      "name": "reinvestSolend",
      "accounts": [
        {
          "name": "vault",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "authority",
          "isMut": false,
          "isSigner": true
        },
        {
          "name": "executor",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "collateralVault",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "underlyingVault",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "reserveLiquiditySupply",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "reserveCollateralMint",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "lendingMarket",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "lendingMarketAuthority",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "reserve",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "lendingProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    }
  ],
  "accounts": [
    {
      "name": "greeks",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "nonce",
            "type": "u8"
          },
          {
            "name": "markPrices",
            "type": {
              "array": [
                "u64",
                46
              ]
            }
          },
          {
            "name": "markPricesPadding",
            "type": {
              "array": [
                "u64",
                92
              ]
            }
          },
          {
            "name": "productGreeks",
            "type": {
              "array": [
                {
                  "defined": "ProductGreeks"
                },
                22
              ]
            }
          },
          {
            "name": "productGreeksPadding",
            "type": {
              "array": [
                {
                  "defined": "ProductGreeks"
                },
                44
              ]
            }
          },
          {
            "name": "updateTimestamp",
            "type": {
              "array": [
                "u64",
                2
              ]
            }
          },
          {
            "name": "updateTimestampPadding",
            "type": {
              "array": [
                "u64",
                4
              ]
            }
          },
          {
            "name": "retreatExpirationTimestamp",
            "type": {
              "array": [
                "u64",
                2
              ]
            }
          },
          {
            "name": "retreatExpirationTimestampPadding",
            "type": {
              "array": [
                "u64",
                4
              ]
            }
          },
          {
            "name": "interestRate",
            "type": {
              "array": [
                "i64",
                2
              ]
            }
          },
          {
            "name": "interestRatePadding",
            "type": {
              "array": [
                "i64",
                4
              ]
            }
          },
          {
            "name": "nodes",
            "type": {
              "array": [
                "u64",
                5
              ]
            }
          },
          {
            "name": "volatility",
            "type": {
              "array": [
                "u64",
                10
              ]
            }
          },
          {
            "name": "volatilityPadding",
            "type": {
              "array": [
                "u64",
                20
              ]
            }
          },
          {
            "name": "nodeKeys",
            "type": {
              "array": [
                "publicKey",
                138
              ]
            }
          },
          {
            "name": "haltForcePricing",
            "type": {
              "array": [
                "bool",
                6
              ]
            }
          },
          {
            "name": "padding",
            "type": {
              "array": [
                "u8",
                1641
              ]
            }
          }
        ]
      }
    },
    {
      "name": "zetaGroup",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "nonce",
            "type": "u8"
          },
          {
            "name": "vaultNonce",
            "type": "u8"
          },
          {
            "name": "insuranceVaultNonce",
            "type": "u8"
          },
          {
            "name": "frontExpiryIndex",
            "type": "u8"
          },
          {
            "name": "haltState",
            "type": {
              "defined": "HaltState"
            }
          },
          {
            "name": "underlyingMint",
            "type": "publicKey"
          },
          {
            "name": "oracle",
            "type": "publicKey"
          },
          {
            "name": "greeks",
            "type": "publicKey"
          },
          {
            "name": "pricingParameters",
            "type": {
              "defined": "PricingParameters"
            }
          },
          {
            "name": "marginParameters",
            "type": {
              "defined": "MarginParameters"
            }
          },
          {
            "name": "products",
            "type": {
              "array": [
                {
                  "defined": "Product"
                },
                46
              ]
            }
          },
          {
            "name": "productsPadding",
            "type": {
              "array": [
                {
                  "defined": "Product"
                },
                92
              ]
            }
          },
          {
            "name": "expirySeries",
            "type": {
              "array": [
                {
                  "defined": "ExpirySeries"
                },
                2
              ]
            }
          },
          {
            "name": "expirySeriesPadding",
            "type": {
              "array": [
                {
                  "defined": "ExpirySeries"
                },
                4
              ]
            }
          },
          {
            "name": "totalInsuranceVaultDeposits",
            "type": "u64"
          },
          {
            "name": "asset",
            "type": {
              "defined": "Asset"
            }
          },
          {
            "name": "expiryIntervalSeconds",
            "type": "u32"
          },
          {
            "name": "newExpiryThresholdSeconds",
            "type": "u32"
          },
          {
            "name": "padding",
            "type": {
              "array": [
                "u8",
                1054
              ]
            }
          }
        ]
      }
    },
    {
      "name": "marginAccount",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "authority",
            "type": "publicKey"
          },
          {
            "name": "nonce",
            "type": "u8"
          },
          {
            "name": "balance",
            "type": "u64"
          },
          {
            "name": "forceCancelFlag",
            "type": "bool"
          },
          {
            "name": "openOrdersNonce",
            "type": {
              "array": [
                "u8",
                138
              ]
            }
          },
          {
            "name": "seriesExpiry",
            "type": {
              "array": [
                "u64",
                6
              ]
            }
          },
          {
            "name": "productLedgers",
            "type": {
              "array": [
                {
                  "defined": "ProductLedger"
                },
                46
              ]
            }
          },
          {
            "name": "productLedgersPadding",
            "type": {
              "array": [
                {
                  "defined": "ProductLedger"
                },
                92
              ]
            }
          },
          {
            "name": "rebalanceAmount",
            "type": "i64"
          },
          {
            "name": "asset",
            "type": {
              "defined": "Asset"
            }
          },
          {
            "name": "accountType",
            "type": {
              "defined": "MarginAccountType"
            }
          },
          {
            "name": "padding",
            "type": {
              "array": [
                "u8",
                386
              ]
            }
          }
        ]
      }
    },
    {
      "name": "vault",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "bump",
            "type": "u8"
          },
          {
            "name": "mintBump",
            "type": "u8"
          },
          {
            "name": "executorBump",
            "type": "u8"
          },
          {
            "name": "currentCycle",
            "type": {
              "defined": "StrategyCycle"
            }
          },
          {
            "name": "usdcVault",
            "type": "publicKey"
          },
          {
            "name": "collateralVault",
            "type": "publicKey"
          },
          {
            "name": "underlyingVault",
            "type": "publicKey"
          },
          {
            "name": "marginAccount",
            "type": "publicKey"
          },
          {
            "name": "reserve",
            "type": "publicKey"
          },
          {
            "name": "zetaGroup",
            "type": "publicKey"
          },
          {
            "name": "authority",
            "type": "publicKey"
          },
          {
            "name": "depositLimit",
            "type": "u64"
          },
          {
            "name": "totalDeposit",
            "type": "u64"
          },
          {
            "name": "totalWithdraw",
            "type": "u64"
          },
          {
            "name": "totalGain",
            "type": "u64"
          },
          {
            "name": "totalHarvest",
            "type": "u64"
          },
          {
            "name": "lockedProfitDegradation",
            "type": "u64"
          },
          {
            "name": "lockedProfit",
            "type": "u64"
          },
          {
            "name": "managementFeeBps",
            "type": "u64"
          },
          {
            "name": "harvestInterval",
            "type": "i64"
          },
          {
            "name": "lastHarvest",
            "type": "i64"
          },
          {
            "name": "lastGain",
            "type": "i64"
          },
          {
            "name": "createdAt",
            "type": "i64"
          }
        ]
      }
    }
  ],
  "types": [
    {
      "name": "WhirlpoolRewardInfo",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "mint",
            "type": "publicKey"
          },
          {
            "name": "vault",
            "type": "publicKey"
          },
          {
            "name": "authority",
            "type": "publicKey"
          },
          {
            "name": "emissionsPerSecondX64",
            "type": "u128"
          },
          {
            "name": "growthGlobalX64",
            "type": "u128"
          }
        ]
      }
    },
    {
      "name": "OpenPositionBumps",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "positionBump",
            "type": "u8"
          }
        ]
      }
    },
    {
      "name": "OpenPositionWithMetadataBumps",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "positionBump",
            "type": "u8"
          },
          {
            "name": "metadataBump",
            "type": "u8"
          }
        ]
      }
    },
    {
      "name": "PositionRewardInfo",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "growthInsideCheckpoint",
            "type": "u128"
          },
          {
            "name": "amountOwed",
            "type": "u64"
          }
        ]
      }
    },
    {
      "name": "ProductGreeks",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "delta",
            "type": "u64"
          },
          {
            "name": "vega",
            "type": {
              "defined": "AnchorDecimal"
            }
          },
          {
            "name": "volatility",
            "type": {
              "defined": "AnchorDecimal"
            }
          }
        ]
      }
    },
    {
      "name": "AnchorDecimal",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "flags",
            "type": "u32"
          },
          {
            "name": "hi",
            "type": "u32"
          },
          {
            "name": "lo",
            "type": "u32"
          },
          {
            "name": "mid",
            "type": "u32"
          }
        ]
      }
    },
    {
      "name": "HaltState",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "halted",
            "type": "bool"
          },
          {
            "name": "spotPrice",
            "type": "u64"
          },
          {
            "name": "timestamp",
            "type": "u64"
          },
          {
            "name": "markPricesSet",
            "type": {
              "array": [
                "bool",
                2
              ]
            }
          },
          {
            "name": "markPricesSetPadding",
            "type": {
              "array": [
                "bool",
                4
              ]
            }
          },
          {
            "name": "marketNodesCleaned",
            "type": {
              "array": [
                "bool",
                2
              ]
            }
          },
          {
            "name": "marketNodesCleanedPadding",
            "type": {
              "array": [
                "bool",
                4
              ]
            }
          },
          {
            "name": "marketCleaned",
            "type": {
              "array": [
                "bool",
                46
              ]
            }
          },
          {
            "name": "marketCleanedPadding",
            "type": {
              "array": [
                "bool",
                92
              ]
            }
          }
        ]
      }
    },
    {
      "name": "PricingParameters",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "optionTradeNormalizer",
            "type": {
              "defined": "AnchorDecimal"
            }
          },
          {
            "name": "futureTradeNormalizer",
            "type": {
              "defined": "AnchorDecimal"
            }
          },
          {
            "name": "maxVolatilityRetreat",
            "type": {
              "defined": "AnchorDecimal"
            }
          },
          {
            "name": "maxInterestRetreat",
            "type": {
              "defined": "AnchorDecimal"
            }
          },
          {
            "name": "maxDelta",
            "type": "u64"
          },
          {
            "name": "minDelta",
            "type": "u64"
          },
          {
            "name": "minVolatility",
            "type": "u64"
          },
          {
            "name": "maxVolatility",
            "type": "u64"
          },
          {
            "name": "minInterestRate",
            "type": "i64"
          },
          {
            "name": "maxInterestRate",
            "type": "i64"
          }
        ]
      }
    },
    {
      "name": "MarginParameters",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "futureMarginInitial",
            "type": "u64"
          },
          {
            "name": "futureMarginMaintenance",
            "type": "u64"
          },
          {
            "name": "optionMarkPercentageLongInitial",
            "type": "u64"
          },
          {
            "name": "optionSpotPercentageLongInitial",
            "type": "u64"
          },
          {
            "name": "optionSpotPercentageShortInitial",
            "type": "u64"
          },
          {
            "name": "optionDynamicPercentageShortInitial",
            "type": "u64"
          },
          {
            "name": "optionMarkPercentageLongMaintenance",
            "type": "u64"
          },
          {
            "name": "optionSpotPercentageLongMaintenance",
            "type": "u64"
          },
          {
            "name": "optionSpotPercentageShortMaintenance",
            "type": "u64"
          },
          {
            "name": "optionDynamicPercentageShortMaintenance",
            "type": "u64"
          },
          {
            "name": "optionShortPutCapPercentage",
            "type": "u64"
          },
          {
            "name": "padding",
            "type": {
              "array": [
                "u8",
                32
              ]
            }
          }
        ]
      }
    },
    {
      "name": "ExpirySeries",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "activeTs",
            "type": "u64"
          },
          {
            "name": "expiryTs",
            "type": "u64"
          },
          {
            "name": "dirty",
            "type": "bool"
          },
          {
            "name": "padding",
            "type": {
              "array": [
                "u8",
                15
              ]
            }
          }
        ]
      }
    },
    {
      "name": "Strike",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "isSet",
            "type": "bool"
          },
          {
            "name": "value",
            "type": "u64"
          }
        ]
      }
    },
    {
      "name": "Product",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "market",
            "type": "publicKey"
          },
          {
            "name": "strike",
            "type": {
              "defined": "Strike"
            }
          },
          {
            "name": "dirty",
            "type": "bool"
          },
          {
            "name": "kind",
            "type": {
              "defined": "Kind"
            }
          }
        ]
      }
    },
    {
      "name": "Position",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "size",
            "type": "i64"
          },
          {
            "name": "costOfTrades",
            "type": "u64"
          }
        ]
      }
    },
    {
      "name": "OrderState",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "closingOrders",
            "type": "u64"
          },
          {
            "name": "openingOrders",
            "type": {
              "array": [
                "u64",
                2
              ]
            }
          }
        ]
      }
    },
    {
      "name": "ProductLedger",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "position",
            "type": {
              "defined": "Position"
            }
          },
          {
            "name": "orderState",
            "type": {
              "defined": "OrderState"
            }
          }
        ]
      }
    },
    {
      "name": "LendingInstruction",
      "type": {
        "kind": "enum",
        "variants": [
          {
            "name": "InitLendingMarket",
            "fields": [
              {
                "name": "owner",
                "type": "publicKey"
              },
              {
                "name": "quote_currency",
                "type": {
                  "array": [
                    "u8",
                    32
                  ]
                }
              }
            ]
          },
          {
            "name": "SetLendingMarketOwner",
            "fields": [
              {
                "name": "new_owner",
                "type": "publicKey"
              }
            ]
          },
          {
            "name": "RefreshReserve"
          },
          {
            "name": "DepositReserveLiquidity",
            "fields": [
              {
                "name": "liquidity_amount",
                "type": "u64"
              }
            ]
          },
          {
            "name": "RedeemReserveCollateral",
            "fields": [
              {
                "name": "collateral_amount",
                "type": "u64"
              }
            ]
          },
          {
            "name": "InitObligation"
          },
          {
            "name": "RefreshObligation"
          },
          {
            "name": "DepositObligationCollateral",
            "fields": [
              {
                "name": "collateral_amount",
                "type": "u64"
              }
            ]
          },
          {
            "name": "WithdrawObligationCollateral",
            "fields": [
              {
                "name": "collateral_amount",
                "type": "u64"
              }
            ]
          },
          {
            "name": "BorrowObligationLiquidity",
            "fields": [
              {
                "name": "liquidity_amount",
                "type": "u64"
              }
            ]
          },
          {
            "name": "RepayObligationLiquidity",
            "fields": [
              {
                "name": "liquidity_amount",
                "type": "u64"
              }
            ]
          },
          {
            "name": "LiquidateObligation",
            "fields": [
              {
                "name": "liquidity_amount",
                "type": "u64"
              }
            ]
          },
          {
            "name": "FlashLoan",
            "fields": [
              {
                "name": "amount",
                "type": "u64"
              }
            ]
          }
        ]
      }
    },
    {
      "name": "FeeCalculation",
      "type": {
        "kind": "enum",
        "variants": [
          {
            "name": "Exclusive"
          },
          {
            "name": "Inclusive"
          }
        ]
      }
    },
    {
      "name": "PriceStatus",
      "type": {
        "kind": "enum",
        "variants": [
          {
            "name": "Unknown"
          },
          {
            "name": "Trading"
          },
          {
            "name": "Halted"
          },
          {
            "name": "Auction"
          }
        ]
      }
    },
    {
      "name": "CorpAction",
      "type": {
        "kind": "enum",
        "variants": [
          {
            "name": "NoCorpAct"
          }
        ]
      }
    },
    {
      "name": "PriceType",
      "type": {
        "kind": "enum",
        "variants": [
          {
            "name": "Unknown"
          },
          {
            "name": "Price"
          },
          {
            "name": "TWAP"
          },
          {
            "name": "Volatility"
          }
        ]
      }
    },
    {
      "name": "ExpirySeriesStatus",
      "type": {
        "kind": "enum",
        "variants": [
          {
            "name": "Uninitialized"
          },
          {
            "name": "Initialized"
          },
          {
            "name": "Live"
          },
          {
            "name": "Expired"
          },
          {
            "name": "ExpiredDirty"
          }
        ]
      }
    },
    {
      "name": "Kind",
      "type": {
        "kind": "enum",
        "variants": [
          {
            "name": "Uninitialized"
          },
          {
            "name": "Call"
          },
          {
            "name": "Put"
          },
          {
            "name": "Future"
          }
        ]
      }
    },
    {
      "name": "Side",
      "type": {
        "kind": "enum",
        "variants": [
          {
            "name": "Uninitialized"
          },
          {
            "name": "Bid"
          },
          {
            "name": "Ask"
          }
        ]
      }
    },
    {
      "name": "OrderType",
      "type": {
        "kind": "enum",
        "variants": [
          {
            "name": "Limit"
          },
          {
            "name": "PostOnly"
          },
          {
            "name": "FillOrKill"
          }
        ]
      }
    },
    {
      "name": "Asset",
      "type": {
        "kind": "enum",
        "variants": [
          {
            "name": "SOL"
          },
          {
            "name": "BTC"
          },
          {
            "name": "ETH"
          },
          {
            "name": "UNDEFINED"
          }
        ]
      }
    },
    {
      "name": "MarginAccountType",
      "type": {
        "kind": "enum",
        "variants": [
          {
            "name": "Normal"
          },
          {
            "name": "MarketMaker"
          }
        ]
      }
    },
    {
      "name": "MarginRequirement",
      "type": {
        "kind": "enum",
        "variants": [
          {
            "name": "Initial"
          },
          {
            "name": "Maintenance"
          },
          {
            "name": "MaintenanceIncludingOrders"
          },
          {
            "name": "MarketMakerConcession"
          }
        ]
      }
    },
    {
      "name": "FuzeErrorCode",
      "type": {
        "kind": "enum",
        "variants": [
          {
            "name": "AccountNotMutable"
          },
          {
            "name": "UnsupportedKind"
          },
          {
            "name": "ProductStrikeUninitialized"
          },
          {
            "name": "InvalidProductMarketKey"
          },
          {
            "name": "MarketNotLive"
          },
          {
            "name": "ProductDirty"
          },
          {
            "name": "InvalidOptionKind"
          }
        ]
      }
    },
    {
      "name": "VaultError",
      "type": {
        "kind": "enum",
        "variants": [
          {
            "name": "CrankDenied"
          },
          {
            "name": "HarvestDenied"
          },
          {
            "name": "SharesOverflow"
          },
          {
            "name": "VaultIsFull"
          },
          {
            "name": "ZeroDeposit"
          },
          {
            "name": "ZeroWithdraw"
          },
          {
            "name": "CrankerNotFound"
          },
          {
            "name": "ZeroBalanceSwap"
          },
          {
            "name": "UnexpectedExit"
          },
          {
            "name": "DepositDisabled"
          },
          {
            "name": "UseEmergencyWithdraw"
          }
        ]
      }
    },
    {
      "name": "StrategyCycle",
      "type": {
        "kind": "enum",
        "variants": [
          {
            "name": "Uninitialized"
          },
          {
            "name": "Deposit"
          },
          {
            "name": "Auction"
          },
          {
            "name": "Harvest"
          }
        ]
      }
    }
  ],
  "errors": [
    {
      "code": 6000,
      "name": "InvalidEnum",
      "msg": "Enum value could not be converted"
    },
    {
      "code": 6001,
      "name": "InvalidStartTick",
      "msg": "Invalid start tick index provided."
    },
    {
      "code": 6002,
      "name": "TickArrayExistInPool",
      "msg": "Tick-array already exists in this whirlpool"
    },
    {
      "code": 6003,
      "name": "TickArrayIndexOutofBounds",
      "msg": "Attempt to search for a tick-array failed"
    },
    {
      "code": 6004,
      "name": "InvalidTickSpacing",
      "msg": "Tick-spacing is not supported"
    },
    {
      "code": 6005,
      "name": "ClosePositionNotEmpty",
      "msg": "Position is not empty It cannot be closed"
    },
    {
      "code": 6006,
      "name": "DivideByZero",
      "msg": "Unable to divide by zero"
    },
    {
      "code": 6007,
      "name": "NumberCastError",
      "msg": "Unable to cast number into BigInt"
    },
    {
      "code": 6008,
      "name": "NumberDownCastError",
      "msg": "Unable to down cast number"
    },
    {
      "code": 6009,
      "name": "TickNotFound",
      "msg": "Tick not found within tick array"
    },
    {
      "code": 6010,
      "name": "InvalidTickIndex",
      "msg": "Provided tick index is either out of bounds or uninitializable"
    },
    {
      "code": 6011,
      "name": "SqrtPriceOutOfBounds",
      "msg": "Provided sqrt price out of bounds"
    },
    {
      "code": 6012,
      "name": "LiquidityZero",
      "msg": "Liquidity amount must be greater than zero"
    },
    {
      "code": 6013,
      "name": "LiquidityTooHigh",
      "msg": "Liquidity amount must be less than i64::MAX"
    },
    {
      "code": 6014,
      "name": "LiquidityOverflow",
      "msg": "Liquidity overflow"
    },
    {
      "code": 6015,
      "name": "LiquidityUnderflow",
      "msg": "Liquidity underflow"
    },
    {
      "code": 6016,
      "name": "LiquidityNetError",
      "msg": "Tick liquidity net underflowed or overflowed"
    },
    {
      "code": 6017,
      "name": "TokenMaxExceeded",
      "msg": "Exceeded token max"
    },
    {
      "code": 6018,
      "name": "TokenMinSubceeded",
      "msg": "Did not meet token min"
    },
    {
      "code": 6019,
      "name": "MissingOrInvalidDelegate",
      "msg": "Position token account has a missing or invalid delegate"
    },
    {
      "code": 6020,
      "name": "InvalidPositionTokenAmount",
      "msg": "Position token amount must be 1"
    },
    {
      "code": 6021,
      "name": "InvalidTimestampConversion",
      "msg": "Timestamp should be convertible from i64 to u64"
    },
    {
      "code": 6022,
      "name": "InvalidTimestamp",
      "msg": "Timestamp should be greater than the last updated timestamp"
    },
    {
      "code": 6023,
      "name": "InvalidTickArraySequence",
      "msg": "Invalid tick array sequence provided for instruction."
    },
    {
      "code": 6024,
      "name": "InvalidTokenMintOrder",
      "msg": "Token Mint in wrong order"
    },
    {
      "code": 6025,
      "name": "RewardNotInitialized",
      "msg": "Reward not initialized"
    },
    {
      "code": 6026,
      "name": "InvalidRewardIndex",
      "msg": "Invalid reward index"
    },
    {
      "code": 6027,
      "name": "RewardVaultAmountInsufficient",
      "msg": "Reward vault requires amount to support emissions for at least one day"
    },
    {
      "code": 6028,
      "name": "FeeRateMaxExceeded",
      "msg": "Exceeded max fee rate"
    },
    {
      "code": 6029,
      "name": "ProtocolFeeRateMaxExceeded",
      "msg": "Exceeded max protocol fee rate"
    },
    {
      "code": 6030,
      "name": "MultiplicationShiftRightOverflow",
      "msg": "Multiplication with shift right overflow"
    },
    {
      "code": 6031,
      "name": "MulDivOverflow",
      "msg": "Muldiv overflow"
    },
    {
      "code": 6032,
      "name": "MulDivInvalidInput",
      "msg": "Invalid div_u256 input"
    },
    {
      "code": 6033,
      "name": "MultiplicationOverflow",
      "msg": "Multiplication overflow"
    },
    {
      "code": 6034,
      "name": "InvalidSqrtPriceLimitDirection",
      "msg": "Provided SqrtPriceLimit not in the same direction as the swap."
    },
    {
      "code": 6035,
      "name": "ZeroTradableAmount",
      "msg": "There are no tradable amount to swap."
    },
    {
      "code": 6036,
      "name": "AmountOutBelowMinimum",
      "msg": "Amount out below minimum threshold"
    },
    {
      "code": 6037,
      "name": "AmountInAboveMaximum",
      "msg": "Amount in above maximum threshold"
    },
    {
      "code": 6038,
      "name": "TickArraySequenceInvalidIndex",
      "msg": "Invalid index for tick array sequence"
    },
    {
      "code": 6039,
      "name": "AmountCalcOverflow",
      "msg": "Amount calculated overflows"
    },
    {
      "code": 6040,
      "name": "AmountRemainingOverflow",
      "msg": "Amount remaining overflows"
    }
  ]
};

export const IDL: VaultZeta = {
  "version": "0.1.0",
  "name": "vault_zeta",
  "instructions": [
    {
      "name": "initialize",
      "accounts": [
        {
          "name": "vault",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "sharesMint",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "executor",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "collateralVault",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "underlyingVault",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "usdcVault",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "reserve",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "authority",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "marginAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "zetaGroup",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "zetaProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "rent",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "depositLimit",
          "type": "u64"
        },
        {
          "name": "managementFeeBps",
          "type": "u64"
        }
      ]
    },
    {
      "name": "deposit",
      "accounts": [
        {
          "name": "userShares",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "userTokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "userAccount",
          "isMut": false,
          "isSigner": true
        },
        {
          "name": "vault",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "collateralVault",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "executor",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "sharesMint",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "reserveLiquiditySupply",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "reserveCollateralMint",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "lendingMarket",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "lendingMarketAuthority",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "reserve",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "lendingProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "amountIn",
          "type": "u64"
        }
      ]
    },
    {
      "name": "withdraw",
      "accounts": [
        {
          "name": "userShares",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "userTokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "userAccount",
          "isMut": false,
          "isSigner": true
        },
        {
          "name": "vault",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "executor",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "sharesMint",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "collateralVault",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "reserveLiquiditySupply",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "reserveCollateralMint",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "lendingMarket",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "lendingMarketAuthority",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "reserve",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "lendingProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "amountOut",
          "type": "u64"
        }
      ]
    },
    {
      "name": "initOpenOrders",
      "accounts": [
        {
          "name": "vault",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "executor",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "authority",
          "isMut": false,
          "isSigner": true
        },
        {
          "name": "state",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "zetaGroup",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "dexProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "openOrders",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "marginAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "market",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "serumAuthority",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "openOrdersMap",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "rent",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "zetaProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    },
    {
      "name": "harvestYield",
      "accounts": [
        {
          "name": "vault",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "executor",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "authority",
          "isMut": false,
          "isSigner": true
        },
        {
          "name": "collateralVault",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "underlyingVault",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "reserveLiquiditySupply",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "reserveCollateralMint",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "lendingMarket",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "lendingMarketAuthority",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "reserve",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "lendingProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    },
    {
      "name": "swapToUsdc",
      "accounts": [
        {
          "name": "vault",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "executor",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "authority",
          "isMut": false,
          "isSigner": true
        },
        {
          "name": "whirlpool",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "underlyingVault",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "usdcVault",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenVaultA",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenVaultB",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tickArray0",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tickArray1",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tickArray2",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "oracle",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "poolProgramId",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    },
    {
      "name": "swapToUnderlying",
      "accounts": [
        {
          "name": "vault",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "executor",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "authority",
          "isMut": false,
          "isSigner": true
        },
        {
          "name": "whirlpool",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "underlyingVault",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "usdcVault",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenVaultA",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenVaultB",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tickArray0",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tickArray1",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tickArray2",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "oracle",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "poolProgramId",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    },
    {
      "name": "reinvestZeta",
      "accounts": [
        {
          "name": "vault",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "executor",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "authority",
          "isMut": false,
          "isSigner": true
        },
        {
          "name": "usdcVault",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "zetaGroup",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "zetaVault",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "marginAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "socializedLossAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "state",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "greeks",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "zetaProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    },
    {
      "name": "bidOrder",
      "accounts": [
        {
          "name": "vault",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "executor",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "authority",
          "isMut": false,
          "isSigner": true
        },
        {
          "name": "oracle",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "zetaGroup",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "zetaVault",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "marginAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "socializedLossAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "state",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "market",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "requestQueue",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "eventQueue",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "bids",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "asks",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "coinVault",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "pcVault",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "coinWallet",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "pcWallet",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "dexProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "serumAuthority",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "greeks",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "openOrders",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "marketNode",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "marketMint",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "mintAuthority",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "rent",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "zetaProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    },
    {
      "name": "redeemZeta",
      "accounts": [
        {
          "name": "vault",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "executor",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "authority",
          "isMut": false,
          "isSigner": true
        },
        {
          "name": "usdcVault",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "oracle",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "zetaGroup",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "zetaVault",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "marginAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "socializedLossAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "state",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "greeks",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "zetaProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "amountOut",
          "type": "u64"
        }
      ]
    },
    {
      "name": "reinvestSolend",
      "accounts": [
        {
          "name": "vault",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "authority",
          "isMut": false,
          "isSigner": true
        },
        {
          "name": "executor",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "collateralVault",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "underlyingVault",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "reserveLiquiditySupply",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "reserveCollateralMint",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "lendingMarket",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "lendingMarketAuthority",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "reserve",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "lendingProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    }
  ],
  "accounts": [
    {
      "name": "greeks",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "nonce",
            "type": "u8"
          },
          {
            "name": "markPrices",
            "type": {
              "array": [
                "u64",
                46
              ]
            }
          },
          {
            "name": "markPricesPadding",
            "type": {
              "array": [
                "u64",
                92
              ]
            }
          },
          {
            "name": "productGreeks",
            "type": {
              "array": [
                {
                  "defined": "ProductGreeks"
                },
                22
              ]
            }
          },
          {
            "name": "productGreeksPadding",
            "type": {
              "array": [
                {
                  "defined": "ProductGreeks"
                },
                44
              ]
            }
          },
          {
            "name": "updateTimestamp",
            "type": {
              "array": [
                "u64",
                2
              ]
            }
          },
          {
            "name": "updateTimestampPadding",
            "type": {
              "array": [
                "u64",
                4
              ]
            }
          },
          {
            "name": "retreatExpirationTimestamp",
            "type": {
              "array": [
                "u64",
                2
              ]
            }
          },
          {
            "name": "retreatExpirationTimestampPadding",
            "type": {
              "array": [
                "u64",
                4
              ]
            }
          },
          {
            "name": "interestRate",
            "type": {
              "array": [
                "i64",
                2
              ]
            }
          },
          {
            "name": "interestRatePadding",
            "type": {
              "array": [
                "i64",
                4
              ]
            }
          },
          {
            "name": "nodes",
            "type": {
              "array": [
                "u64",
                5
              ]
            }
          },
          {
            "name": "volatility",
            "type": {
              "array": [
                "u64",
                10
              ]
            }
          },
          {
            "name": "volatilityPadding",
            "type": {
              "array": [
                "u64",
                20
              ]
            }
          },
          {
            "name": "nodeKeys",
            "type": {
              "array": [
                "publicKey",
                138
              ]
            }
          },
          {
            "name": "haltForcePricing",
            "type": {
              "array": [
                "bool",
                6
              ]
            }
          },
          {
            "name": "padding",
            "type": {
              "array": [
                "u8",
                1641
              ]
            }
          }
        ]
      }
    },
    {
      "name": "zetaGroup",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "nonce",
            "type": "u8"
          },
          {
            "name": "vaultNonce",
            "type": "u8"
          },
          {
            "name": "insuranceVaultNonce",
            "type": "u8"
          },
          {
            "name": "frontExpiryIndex",
            "type": "u8"
          },
          {
            "name": "haltState",
            "type": {
              "defined": "HaltState"
            }
          },
          {
            "name": "underlyingMint",
            "type": "publicKey"
          },
          {
            "name": "oracle",
            "type": "publicKey"
          },
          {
            "name": "greeks",
            "type": "publicKey"
          },
          {
            "name": "pricingParameters",
            "type": {
              "defined": "PricingParameters"
            }
          },
          {
            "name": "marginParameters",
            "type": {
              "defined": "MarginParameters"
            }
          },
          {
            "name": "products",
            "type": {
              "array": [
                {
                  "defined": "Product"
                },
                46
              ]
            }
          },
          {
            "name": "productsPadding",
            "type": {
              "array": [
                {
                  "defined": "Product"
                },
                92
              ]
            }
          },
          {
            "name": "expirySeries",
            "type": {
              "array": [
                {
                  "defined": "ExpirySeries"
                },
                2
              ]
            }
          },
          {
            "name": "expirySeriesPadding",
            "type": {
              "array": [
                {
                  "defined": "ExpirySeries"
                },
                4
              ]
            }
          },
          {
            "name": "totalInsuranceVaultDeposits",
            "type": "u64"
          },
          {
            "name": "asset",
            "type": {
              "defined": "Asset"
            }
          },
          {
            "name": "expiryIntervalSeconds",
            "type": "u32"
          },
          {
            "name": "newExpiryThresholdSeconds",
            "type": "u32"
          },
          {
            "name": "padding",
            "type": {
              "array": [
                "u8",
                1054
              ]
            }
          }
        ]
      }
    },
    {
      "name": "marginAccount",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "authority",
            "type": "publicKey"
          },
          {
            "name": "nonce",
            "type": "u8"
          },
          {
            "name": "balance",
            "type": "u64"
          },
          {
            "name": "forceCancelFlag",
            "type": "bool"
          },
          {
            "name": "openOrdersNonce",
            "type": {
              "array": [
                "u8",
                138
              ]
            }
          },
          {
            "name": "seriesExpiry",
            "type": {
              "array": [
                "u64",
                6
              ]
            }
          },
          {
            "name": "productLedgers",
            "type": {
              "array": [
                {
                  "defined": "ProductLedger"
                },
                46
              ]
            }
          },
          {
            "name": "productLedgersPadding",
            "type": {
              "array": [
                {
                  "defined": "ProductLedger"
                },
                92
              ]
            }
          },
          {
            "name": "rebalanceAmount",
            "type": "i64"
          },
          {
            "name": "asset",
            "type": {
              "defined": "Asset"
            }
          },
          {
            "name": "accountType",
            "type": {
              "defined": "MarginAccountType"
            }
          },
          {
            "name": "padding",
            "type": {
              "array": [
                "u8",
                386
              ]
            }
          }
        ]
      }
    },
    {
      "name": "vault",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "bump",
            "type": "u8"
          },
          {
            "name": "mintBump",
            "type": "u8"
          },
          {
            "name": "executorBump",
            "type": "u8"
          },
          {
            "name": "currentCycle",
            "type": {
              "defined": "StrategyCycle"
            }
          },
          {
            "name": "usdcVault",
            "type": "publicKey"
          },
          {
            "name": "collateralVault",
            "type": "publicKey"
          },
          {
            "name": "underlyingVault",
            "type": "publicKey"
          },
          {
            "name": "marginAccount",
            "type": "publicKey"
          },
          {
            "name": "reserve",
            "type": "publicKey"
          },
          {
            "name": "zetaGroup",
            "type": "publicKey"
          },
          {
            "name": "authority",
            "type": "publicKey"
          },
          {
            "name": "depositLimit",
            "type": "u64"
          },
          {
            "name": "totalDeposit",
            "type": "u64"
          },
          {
            "name": "totalWithdraw",
            "type": "u64"
          },
          {
            "name": "totalGain",
            "type": "u64"
          },
          {
            "name": "totalHarvest",
            "type": "u64"
          },
          {
            "name": "lockedProfitDegradation",
            "type": "u64"
          },
          {
            "name": "lockedProfit",
            "type": "u64"
          },
          {
            "name": "managementFeeBps",
            "type": "u64"
          },
          {
            "name": "harvestInterval",
            "type": "i64"
          },
          {
            "name": "lastHarvest",
            "type": "i64"
          },
          {
            "name": "lastGain",
            "type": "i64"
          },
          {
            "name": "createdAt",
            "type": "i64"
          }
        ]
      }
    }
  ],
  "types": [
    {
      "name": "WhirlpoolRewardInfo",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "mint",
            "type": "publicKey"
          },
          {
            "name": "vault",
            "type": "publicKey"
          },
          {
            "name": "authority",
            "type": "publicKey"
          },
          {
            "name": "emissionsPerSecondX64",
            "type": "u128"
          },
          {
            "name": "growthGlobalX64",
            "type": "u128"
          }
        ]
      }
    },
    {
      "name": "OpenPositionBumps",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "positionBump",
            "type": "u8"
          }
        ]
      }
    },
    {
      "name": "OpenPositionWithMetadataBumps",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "positionBump",
            "type": "u8"
          },
          {
            "name": "metadataBump",
            "type": "u8"
          }
        ]
      }
    },
    {
      "name": "PositionRewardInfo",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "growthInsideCheckpoint",
            "type": "u128"
          },
          {
            "name": "amountOwed",
            "type": "u64"
          }
        ]
      }
    },
    {
      "name": "ProductGreeks",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "delta",
            "type": "u64"
          },
          {
            "name": "vega",
            "type": {
              "defined": "AnchorDecimal"
            }
          },
          {
            "name": "volatility",
            "type": {
              "defined": "AnchorDecimal"
            }
          }
        ]
      }
    },
    {
      "name": "AnchorDecimal",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "flags",
            "type": "u32"
          },
          {
            "name": "hi",
            "type": "u32"
          },
          {
            "name": "lo",
            "type": "u32"
          },
          {
            "name": "mid",
            "type": "u32"
          }
        ]
      }
    },
    {
      "name": "HaltState",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "halted",
            "type": "bool"
          },
          {
            "name": "spotPrice",
            "type": "u64"
          },
          {
            "name": "timestamp",
            "type": "u64"
          },
          {
            "name": "markPricesSet",
            "type": {
              "array": [
                "bool",
                2
              ]
            }
          },
          {
            "name": "markPricesSetPadding",
            "type": {
              "array": [
                "bool",
                4
              ]
            }
          },
          {
            "name": "marketNodesCleaned",
            "type": {
              "array": [
                "bool",
                2
              ]
            }
          },
          {
            "name": "marketNodesCleanedPadding",
            "type": {
              "array": [
                "bool",
                4
              ]
            }
          },
          {
            "name": "marketCleaned",
            "type": {
              "array": [
                "bool",
                46
              ]
            }
          },
          {
            "name": "marketCleanedPadding",
            "type": {
              "array": [
                "bool",
                92
              ]
            }
          }
        ]
      }
    },
    {
      "name": "PricingParameters",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "optionTradeNormalizer",
            "type": {
              "defined": "AnchorDecimal"
            }
          },
          {
            "name": "futureTradeNormalizer",
            "type": {
              "defined": "AnchorDecimal"
            }
          },
          {
            "name": "maxVolatilityRetreat",
            "type": {
              "defined": "AnchorDecimal"
            }
          },
          {
            "name": "maxInterestRetreat",
            "type": {
              "defined": "AnchorDecimal"
            }
          },
          {
            "name": "maxDelta",
            "type": "u64"
          },
          {
            "name": "minDelta",
            "type": "u64"
          },
          {
            "name": "minVolatility",
            "type": "u64"
          },
          {
            "name": "maxVolatility",
            "type": "u64"
          },
          {
            "name": "minInterestRate",
            "type": "i64"
          },
          {
            "name": "maxInterestRate",
            "type": "i64"
          }
        ]
      }
    },
    {
      "name": "MarginParameters",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "futureMarginInitial",
            "type": "u64"
          },
          {
            "name": "futureMarginMaintenance",
            "type": "u64"
          },
          {
            "name": "optionMarkPercentageLongInitial",
            "type": "u64"
          },
          {
            "name": "optionSpotPercentageLongInitial",
            "type": "u64"
          },
          {
            "name": "optionSpotPercentageShortInitial",
            "type": "u64"
          },
          {
            "name": "optionDynamicPercentageShortInitial",
            "type": "u64"
          },
          {
            "name": "optionMarkPercentageLongMaintenance",
            "type": "u64"
          },
          {
            "name": "optionSpotPercentageLongMaintenance",
            "type": "u64"
          },
          {
            "name": "optionSpotPercentageShortMaintenance",
            "type": "u64"
          },
          {
            "name": "optionDynamicPercentageShortMaintenance",
            "type": "u64"
          },
          {
            "name": "optionShortPutCapPercentage",
            "type": "u64"
          },
          {
            "name": "padding",
            "type": {
              "array": [
                "u8",
                32
              ]
            }
          }
        ]
      }
    },
    {
      "name": "ExpirySeries",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "activeTs",
            "type": "u64"
          },
          {
            "name": "expiryTs",
            "type": "u64"
          },
          {
            "name": "dirty",
            "type": "bool"
          },
          {
            "name": "padding",
            "type": {
              "array": [
                "u8",
                15
              ]
            }
          }
        ]
      }
    },
    {
      "name": "Strike",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "isSet",
            "type": "bool"
          },
          {
            "name": "value",
            "type": "u64"
          }
        ]
      }
    },
    {
      "name": "Product",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "market",
            "type": "publicKey"
          },
          {
            "name": "strike",
            "type": {
              "defined": "Strike"
            }
          },
          {
            "name": "dirty",
            "type": "bool"
          },
          {
            "name": "kind",
            "type": {
              "defined": "Kind"
            }
          }
        ]
      }
    },
    {
      "name": "Position",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "size",
            "type": "i64"
          },
          {
            "name": "costOfTrades",
            "type": "u64"
          }
        ]
      }
    },
    {
      "name": "OrderState",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "closingOrders",
            "type": "u64"
          },
          {
            "name": "openingOrders",
            "type": {
              "array": [
                "u64",
                2
              ]
            }
          }
        ]
      }
    },
    {
      "name": "ProductLedger",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "position",
            "type": {
              "defined": "Position"
            }
          },
          {
            "name": "orderState",
            "type": {
              "defined": "OrderState"
            }
          }
        ]
      }
    },
    {
      "name": "LendingInstruction",
      "type": {
        "kind": "enum",
        "variants": [
          {
            "name": "InitLendingMarket",
            "fields": [
              {
                "name": "owner",
                "type": "publicKey"
              },
              {
                "name": "quote_currency",
                "type": {
                  "array": [
                    "u8",
                    32
                  ]
                }
              }
            ]
          },
          {
            "name": "SetLendingMarketOwner",
            "fields": [
              {
                "name": "new_owner",
                "type": "publicKey"
              }
            ]
          },
          {
            "name": "RefreshReserve"
          },
          {
            "name": "DepositReserveLiquidity",
            "fields": [
              {
                "name": "liquidity_amount",
                "type": "u64"
              }
            ]
          },
          {
            "name": "RedeemReserveCollateral",
            "fields": [
              {
                "name": "collateral_amount",
                "type": "u64"
              }
            ]
          },
          {
            "name": "InitObligation"
          },
          {
            "name": "RefreshObligation"
          },
          {
            "name": "DepositObligationCollateral",
            "fields": [
              {
                "name": "collateral_amount",
                "type": "u64"
              }
            ]
          },
          {
            "name": "WithdrawObligationCollateral",
            "fields": [
              {
                "name": "collateral_amount",
                "type": "u64"
              }
            ]
          },
          {
            "name": "BorrowObligationLiquidity",
            "fields": [
              {
                "name": "liquidity_amount",
                "type": "u64"
              }
            ]
          },
          {
            "name": "RepayObligationLiquidity",
            "fields": [
              {
                "name": "liquidity_amount",
                "type": "u64"
              }
            ]
          },
          {
            "name": "LiquidateObligation",
            "fields": [
              {
                "name": "liquidity_amount",
                "type": "u64"
              }
            ]
          },
          {
            "name": "FlashLoan",
            "fields": [
              {
                "name": "amount",
                "type": "u64"
              }
            ]
          }
        ]
      }
    },
    {
      "name": "FeeCalculation",
      "type": {
        "kind": "enum",
        "variants": [
          {
            "name": "Exclusive"
          },
          {
            "name": "Inclusive"
          }
        ]
      }
    },
    {
      "name": "PriceStatus",
      "type": {
        "kind": "enum",
        "variants": [
          {
            "name": "Unknown"
          },
          {
            "name": "Trading"
          },
          {
            "name": "Halted"
          },
          {
            "name": "Auction"
          }
        ]
      }
    },
    {
      "name": "CorpAction",
      "type": {
        "kind": "enum",
        "variants": [
          {
            "name": "NoCorpAct"
          }
        ]
      }
    },
    {
      "name": "PriceType",
      "type": {
        "kind": "enum",
        "variants": [
          {
            "name": "Unknown"
          },
          {
            "name": "Price"
          },
          {
            "name": "TWAP"
          },
          {
            "name": "Volatility"
          }
        ]
      }
    },
    {
      "name": "ExpirySeriesStatus",
      "type": {
        "kind": "enum",
        "variants": [
          {
            "name": "Uninitialized"
          },
          {
            "name": "Initialized"
          },
          {
            "name": "Live"
          },
          {
            "name": "Expired"
          },
          {
            "name": "ExpiredDirty"
          }
        ]
      }
    },
    {
      "name": "Kind",
      "type": {
        "kind": "enum",
        "variants": [
          {
            "name": "Uninitialized"
          },
          {
            "name": "Call"
          },
          {
            "name": "Put"
          },
          {
            "name": "Future"
          }
        ]
      }
    },
    {
      "name": "Side",
      "type": {
        "kind": "enum",
        "variants": [
          {
            "name": "Uninitialized"
          },
          {
            "name": "Bid"
          },
          {
            "name": "Ask"
          }
        ]
      }
    },
    {
      "name": "OrderType",
      "type": {
        "kind": "enum",
        "variants": [
          {
            "name": "Limit"
          },
          {
            "name": "PostOnly"
          },
          {
            "name": "FillOrKill"
          }
        ]
      }
    },
    {
      "name": "Asset",
      "type": {
        "kind": "enum",
        "variants": [
          {
            "name": "SOL"
          },
          {
            "name": "BTC"
          },
          {
            "name": "ETH"
          },
          {
            "name": "UNDEFINED"
          }
        ]
      }
    },
    {
      "name": "MarginAccountType",
      "type": {
        "kind": "enum",
        "variants": [
          {
            "name": "Normal"
          },
          {
            "name": "MarketMaker"
          }
        ]
      }
    },
    {
      "name": "MarginRequirement",
      "type": {
        "kind": "enum",
        "variants": [
          {
            "name": "Initial"
          },
          {
            "name": "Maintenance"
          },
          {
            "name": "MaintenanceIncludingOrders"
          },
          {
            "name": "MarketMakerConcession"
          }
        ]
      }
    },
    {
      "name": "FuzeErrorCode",
      "type": {
        "kind": "enum",
        "variants": [
          {
            "name": "AccountNotMutable"
          },
          {
            "name": "UnsupportedKind"
          },
          {
            "name": "ProductStrikeUninitialized"
          },
          {
            "name": "InvalidProductMarketKey"
          },
          {
            "name": "MarketNotLive"
          },
          {
            "name": "ProductDirty"
          },
          {
            "name": "InvalidOptionKind"
          }
        ]
      }
    },
    {
      "name": "VaultError",
      "type": {
        "kind": "enum",
        "variants": [
          {
            "name": "CrankDenied"
          },
          {
            "name": "HarvestDenied"
          },
          {
            "name": "SharesOverflow"
          },
          {
            "name": "VaultIsFull"
          },
          {
            "name": "ZeroDeposit"
          },
          {
            "name": "ZeroWithdraw"
          },
          {
            "name": "CrankerNotFound"
          },
          {
            "name": "ZeroBalanceSwap"
          },
          {
            "name": "UnexpectedExit"
          },
          {
            "name": "DepositDisabled"
          },
          {
            "name": "UseEmergencyWithdraw"
          }
        ]
      }
    },
    {
      "name": "StrategyCycle",
      "type": {
        "kind": "enum",
        "variants": [
          {
            "name": "Uninitialized"
          },
          {
            "name": "Deposit"
          },
          {
            "name": "Auction"
          },
          {
            "name": "Harvest"
          }
        ]
      }
    }
  ],
  "errors": [
    {
      "code": 6000,
      "name": "InvalidEnum",
      "msg": "Enum value could not be converted"
    },
    {
      "code": 6001,
      "name": "InvalidStartTick",
      "msg": "Invalid start tick index provided."
    },
    {
      "code": 6002,
      "name": "TickArrayExistInPool",
      "msg": "Tick-array already exists in this whirlpool"
    },
    {
      "code": 6003,
      "name": "TickArrayIndexOutofBounds",
      "msg": "Attempt to search for a tick-array failed"
    },
    {
      "code": 6004,
      "name": "InvalidTickSpacing",
      "msg": "Tick-spacing is not supported"
    },
    {
      "code": 6005,
      "name": "ClosePositionNotEmpty",
      "msg": "Position is not empty It cannot be closed"
    },
    {
      "code": 6006,
      "name": "DivideByZero",
      "msg": "Unable to divide by zero"
    },
    {
      "code": 6007,
      "name": "NumberCastError",
      "msg": "Unable to cast number into BigInt"
    },
    {
      "code": 6008,
      "name": "NumberDownCastError",
      "msg": "Unable to down cast number"
    },
    {
      "code": 6009,
      "name": "TickNotFound",
      "msg": "Tick not found within tick array"
    },
    {
      "code": 6010,
      "name": "InvalidTickIndex",
      "msg": "Provided tick index is either out of bounds or uninitializable"
    },
    {
      "code": 6011,
      "name": "SqrtPriceOutOfBounds",
      "msg": "Provided sqrt price out of bounds"
    },
    {
      "code": 6012,
      "name": "LiquidityZero",
      "msg": "Liquidity amount must be greater than zero"
    },
    {
      "code": 6013,
      "name": "LiquidityTooHigh",
      "msg": "Liquidity amount must be less than i64::MAX"
    },
    {
      "code": 6014,
      "name": "LiquidityOverflow",
      "msg": "Liquidity overflow"
    },
    {
      "code": 6015,
      "name": "LiquidityUnderflow",
      "msg": "Liquidity underflow"
    },
    {
      "code": 6016,
      "name": "LiquidityNetError",
      "msg": "Tick liquidity net underflowed or overflowed"
    },
    {
      "code": 6017,
      "name": "TokenMaxExceeded",
      "msg": "Exceeded token max"
    },
    {
      "code": 6018,
      "name": "TokenMinSubceeded",
      "msg": "Did not meet token min"
    },
    {
      "code": 6019,
      "name": "MissingOrInvalidDelegate",
      "msg": "Position token account has a missing or invalid delegate"
    },
    {
      "code": 6020,
      "name": "InvalidPositionTokenAmount",
      "msg": "Position token amount must be 1"
    },
    {
      "code": 6021,
      "name": "InvalidTimestampConversion",
      "msg": "Timestamp should be convertible from i64 to u64"
    },
    {
      "code": 6022,
      "name": "InvalidTimestamp",
      "msg": "Timestamp should be greater than the last updated timestamp"
    },
    {
      "code": 6023,
      "name": "InvalidTickArraySequence",
      "msg": "Invalid tick array sequence provided for instruction."
    },
    {
      "code": 6024,
      "name": "InvalidTokenMintOrder",
      "msg": "Token Mint in wrong order"
    },
    {
      "code": 6025,
      "name": "RewardNotInitialized",
      "msg": "Reward not initialized"
    },
    {
      "code": 6026,
      "name": "InvalidRewardIndex",
      "msg": "Invalid reward index"
    },
    {
      "code": 6027,
      "name": "RewardVaultAmountInsufficient",
      "msg": "Reward vault requires amount to support emissions for at least one day"
    },
    {
      "code": 6028,
      "name": "FeeRateMaxExceeded",
      "msg": "Exceeded max fee rate"
    },
    {
      "code": 6029,
      "name": "ProtocolFeeRateMaxExceeded",
      "msg": "Exceeded max protocol fee rate"
    },
    {
      "code": 6030,
      "name": "MultiplicationShiftRightOverflow",
      "msg": "Multiplication with shift right overflow"
    },
    {
      "code": 6031,
      "name": "MulDivOverflow",
      "msg": "Muldiv overflow"
    },
    {
      "code": 6032,
      "name": "MulDivInvalidInput",
      "msg": "Invalid div_u256 input"
    },
    {
      "code": 6033,
      "name": "MultiplicationOverflow",
      "msg": "Multiplication overflow"
    },
    {
      "code": 6034,
      "name": "InvalidSqrtPriceLimitDirection",
      "msg": "Provided SqrtPriceLimit not in the same direction as the swap."
    },
    {
      "code": 6035,
      "name": "ZeroTradableAmount",
      "msg": "There are no tradable amount to swap."
    },
    {
      "code": 6036,
      "name": "AmountOutBelowMinimum",
      "msg": "Amount out below minimum threshold"
    },
    {
      "code": 6037,
      "name": "AmountInAboveMaximum",
      "msg": "Amount in above maximum threshold"
    },
    {
      "code": 6038,
      "name": "TickArraySequenceInvalidIndex",
      "msg": "Invalid index for tick array sequence"
    },
    {
      "code": 6039,
      "name": "AmountCalcOverflow",
      "msg": "Amount calculated overflows"
    },
    {
      "code": 6040,
      "name": "AmountRemainingOverflow",
      "msg": "Amount remaining overflows"
    }
  ]
};
