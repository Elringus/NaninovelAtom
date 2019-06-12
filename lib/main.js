'use strict';

const cp = require('child_process');
const fs = require('fs');
const path = require('path');

const net = require('net');
const {shell} = require('electron');
const {AutoLanguageClient, DownloadFile} = require('atom-languageclient');

class NaniLanguageClient extends AutoLanguageClient {

  getGrammarScopes () { return [ 'source.naniscript' ] }
  getLanguageName () { return 'NaniScript' }
  getServerName () { return 'NaniScript Language Server' }
  getConnectionType() { return 'socket' }

  startServerProcess (projectPath) {
    return new Promise((resolve, reject) => {
      let childProcess;
      const server = net.createServer(socket => {
        // When the language server connects, grab socket, stop listening and resolve
        this.socket = socket;
        server.close();
        resolve(childProcess)
      });
      server.listen(4389, '127.0.0.1', () => {
        // Once we have a port assigned spawn the Language Server with the port
        childProcess = this.getServerProcess([`--tcp=127.0.0.1:${server.address().port}`])
      })
    })
  }

  getServerProcess () {
    const packageRoot = path.join(__dirname, '..');

    const childProcess = cp.spawn(
        "./server/lsp.exe", ["-meta", "./server/metadata.json", "-logfile", "./server/lsp.log"], { cwd: packageRoot }
    );

    childProcess.on("error", err => {
      atom.notifications.addError(
          "Unable to start NaniScript language server.",
          {
            dismissable: true,
            description: err
          }
      )
    });

    childProcess.on('exit', exitCode => {
      if (exitCode !== 0 && exitCode != null) {
        atom.notifications.addError('NaniScript language server stopped unexpectedly.', {
          dismissable: true,
          description: this.processStdErr != null ? `<code>${this.processStdErr}</code>` : `Exit code ${exitCode}`
        })
      }
    });

    return childProcess
  }

}

module.exports = new NaniLanguageClient();
