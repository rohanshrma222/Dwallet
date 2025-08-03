import { createInitializeMint2Instruction, getMinimumBalanceForRentExemptMint, MINT_SIZE } from "@solana/spl-token"
import { sendAndConfirmRawTransaction, sendAndConfirmTransaction, SystemProgram, Transaction } from "@solana/web3.js";
import { Connection } from "@solana/web3.js";

export function TokenLaunchpad() {

    async function createToken(){
        const lamports = await getMinimumBalanceForRentExemptMint(connection);
        const keypair = Keypair.generate();

        const transaction = new Transaction().add(
            SystemProgram.createAccount({
                fromPubkey: payer.publicKey,
                newAccountPubkey: keypair.publicKey,
                space: MINT_SIZE,
                lamports,
                programId,
            }),
            //@ts-ignore
            createInitializeMint2Instruction(keypair.publicKey,decimals, mintAuthority, freezeAuthority,programId)
        );
        await sendAndConfirmTransaction(Connection,transaction,[payer,keypair],confirmOptions);  
    }
    return  <div style={{
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column'
    }}>
        <h1>Solana Token Launchpad</h1>
        <input className='inputText' type='text' placeholder='Name'></input> <br />
        <input className='inputText' type='text' placeholder='Symbol'></input> <br />
        <input className='inputText' type='text' placeholder='Image URL'></input> <br />
        <input className='inputText' type='text' placeholder='Initial Supply'></input> <br />
        <button onClick={createToken}className='btn'>Create a token</button>
    </div>
}