// // Use authbind to bind to port 53 without elevated privileges
// import spawn from "child_process";
// const authbindPath = "/usr/bin/authbind"; // Adjust the path based on your system
// const port53 = 53;

// const serverProcess = spawn.spawn(authbindPath, [
//   `-p${port53}`,
//   "node",
//   "dnsserver.js",
// ]);

// serverProcess.stdout.on("data", (data) => {
//   console.log(`stdout: ${data}`);
// });

// serverProcess.stderr.on("data", (data) => {
//   console.error(`stderr: ${data}`);
// });

// serverProcess.on("close", (code) => {
//   console.log(`child process exited with code ${code}`);
// });
