import * as anchor from "@project-serum/anchor";
import { Program } from "@project-serum/anchor";
import { YaspZeta } from "../target/types/yasp_zeta";

describe("yasp-zeta", () => {
  // Configure the client to use the local cluster.
  anchor.setProvider(anchor.AnchorProvider.env());

  const program = anchor.workspace.YaspZeta as Program<YaspZeta>;

  it("Is initialized!", async () => {
    // Add your test here.
    const tx = await program.methods.initialize().rpc();
    console.log("Your transaction signature", tx);
  });
});
