const util = require('util');
const exec = util.promisify(require('child_process').exec);

async function executeProcess(cmd) {
    const { stdout, stderr } = await exec(cmd, {env: process.env});

    if (stderr) {
        console.error(`error: ${stderr}`);
        process.exit(1);
    }

    console.log(`${stdout}`);
}

async function main() {
    await executeProcess('echo "$INPUT_AUTHENTICATINPASSWORD" | docker login "$INPUT_REGISTRIEURL" --username "$INPUT_AUTHENTICATINGUSER" --password-stdin');
    await executeProcess('docker pull "$INPUT_SOURCEIMAGE"');
    await executeProcess('docker tag "$INPUT_SOURCEIMAGE "  "$INPUT_DESTINATIONIMAGE"');
    await executeProcess('docker push "$INPUT_DESTINATIONIMAGE"');

    return 1;
}

process.exit(main());
