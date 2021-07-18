/// <reference types="cypress" />

context.skip('Ingredients - API Tests', () => {
  beforeEach(() => {
    cy.resetIngredientsTable();
    cy.visit(Cypress.env('appUrl_Ingredients'));
  })

  // TODO: Write API-Tests
  // Example from JL
  it('Requires date with correct format', () => {
    cy.fixture('de_eur_update-claim.json').then((data) => {
      data.date = '9999-99-99'
      cy.request({
        method: 'POST',
        url: updateUri,
        failOnStatusCode: false,
        body: data
      }).then((response) => {
        expect(response.status).to.eq(400)
        expect(response.body.details[0]).to.contain('Array[date]: This value is not a valid date.')
      })
    })
  })


  // TODO: Download methods
  /**
   * @type {Cypress.PluginConfig}
   */

  const sftpAuth = {
    host: '172.16.26.133',
    port: 22,
    username: 'payment_qa',
    tryKeyboard: true,
    password: 'gtl3$D3ml-RS.Rp_RI'
  }

  let Client = require('ssh2-sftp-client');
  module.exports = (on, config) => {
    // `on` is used to hook into various events Cypress emits
    // `config` is the resolved Cypress config
    on('task', {
      sftpDownloadFile({ file: remoteFilePath, dlFile: localDownloadFile }) {
        console.log('\nStarting File Download: remote %s --> local %s', remoteFilePath, localDownloadFile)
        let sftp = new Client();

        // Meet the server's security requirements
        sftp.on('keyboard-interactive', function (name, instructions, instructionsLang, prompts, finish) {
          console.log('Connection :: keyboard-interactive');
          finish([sftpAuth.password]);
        });

        sftp.connect(sftpAuth).then(() => {
          sftp.fastGet(remoteFilePath, localDownloadFile)
          console.log('File Download :: Finished')
        }).catch(err => {
          console.log(err, 'catch error');
        })
        return null
      },

      sftpDownloadFolder({ folder: remoteFolderPath, dlFolder: localDownloadFolder }) {
        console.log('\nStarting Directory Download: remote %s --> local %s', remoteFolderPath, localDownloadFolder)
        let sftp = new Client();

        // Meet the server's security requirements
        sftp.on('keyboard-interactive', function (name, instructions, instructionsLang, prompts, finish) {
          console.log('Connection :: keyboard-interactive');
          finish([sftpAuth.password]);
        });

        sftp.connect(sftpAuth).then(() => {
          sftp.downloadDir(remoteFolderPath, localDownloadFolder)
          console.log('Directory Download :: Finished')
        }).catch(err => {
          console.log(err, 'catch error');
        })
        return null
      },
    })
  }

  // TODO: Download example
  const localDownloadFolder = 'cypress/downloads/'
  const remoteFilePath = '/data/ksp_jobleads_new_2020-10-22.csv'
  const remoteFolderPath = '/data/'
  /* Download a specified file from the provided SFTP Server */
  it('Download specific remote file', () => {
    //FIXME: downloads folder must exist before launching
    // The download folder must exist or be created before.
    cy.task('sftpDownloadFile', { file: remoteFilePath, dlFile: 'cypress/downloads/dlFile.txt' })
  })

  /* Download all contents of a specified directory from the provided SFTP Server */
  it('Download contents of remote folder', () => {
    cy.task('sftpDownloadFolder', { folder: remoteFolderPath, dlFolder: localDownloadFolder })
  })
})
