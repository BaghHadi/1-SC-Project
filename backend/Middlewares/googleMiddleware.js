const { google } = require('googleapis');
const fs = require('fs');
const path = require('path');
const { inherits } = require('util');
const { content } = require('googleapis/build/src/apis/content');
const credentialsPath = path.join(__dirname, 'credentials.json');
async function updateCel(pos, content, spreadsheetId) {
  try {
    // Charger les informations d'identification OAuth 2.0 depuis le fichier
    const auth = new google.auth.GoogleAuth({
      keyFile: credentialsPath,
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });
    console.log('connected');
    // Créer une instance de l'API Google Sheets
    const sheets = await google.sheets({ version: 'v4', auth });

    // Modifier le contenu de la cellule
    const range = pos; // Spécifiez la cellule que vous voulez mettre à jour
    const newValue = content; // Remplacez par la nouvelle valeur que vous voulez définir
    const request = {
      spreadsheetId,
      range,
      valueInputOption: 'USER_ENTERED',
      resource: {
        range,
        values: [[newValue]],
      },
    };

    // Envoyer la demande de mise à jour
    const response = await sheets.spreadsheets.values.update(request);
    console.log('Cell updated:', response.data.updatedCells);
  } catch (error) {
    console.error('Error updating cell:', error);
  }
}
async function addRow(ligne, Content, idCopy, type) {
  try {
    // Charger les informations d'identification OAuth 2.0 depuis le fichier
    const auth = new google.auth.GoogleAuth({
      keyFile: credentialsPath,
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });
    console.log('connected');
    // Créer une instance de l'API Google Sheets
    const sheets = await google.sheets({ version: 'v4', auth });
    const rowIndex = ligne; // Remplacez par l'indice de ligne où vous voulez insérer
    const insertRequest = {
      spreadsheetId: idCopy,
      resource: {
        requests: [
          {
            insertDimension: {
              range: {
                sheetId: 0,
                dimension: 'ROWS',
                startIndex: rowIndex - 1,
                endIndex: rowIndex,
              },
              inheritFromBefore: true,
            },
          },
        ],
      },
    };
    let valuesToInsert, sc, ec;
    await sheets.spreadsheets.batchUpdate(insertRequest);
    switch (type) {
      case 'commande':
        valuesToInsert = [
          rowIndex - 27,
          '',
          Content.designation,
          Content.quantite,
          Content.prixUnitaire
            ? Content.prixUnitaire
            : Content.prix_unitaire + '.00',
          Content.quantite *
            (Content.prixUnitaire
              ? Content.prixUnitaire
              : Content.prix_unitaire) +
            '.00',
        ];
        (sc = 0), (ec = 2);
        break;
      case 'reception':
        console.log(Content.quantite);
        valuesToInsert = [
          rowIndex - 15,
          Content.designation,
          '',
          '',
          '',
          Content.quantite,
        ];
        console.log(valuesToInsert);
        sc = 1;
        ec = 5;
        break;
      case 'sortie':
        valuesToInsert = [
          rowIndex - 12,
          Content.designation,
          Content.quantite_demande,
          Content.quantite_servie,
          '',
          '',
        ];
        ec = 6;
        break;
      case 'decharge':
        valuesToInsert = [
          Content.designation,
          'N° serie:' +
            Content.reference +
            `\n` +
            'N° inventaire:' +
            Content.num_inventaire,
          Content.observation,
        ];
        ec = 3;
        break;
      case 'registre':
        valuesToInsert = [
          Content.num_inventaire,
          Content.date_inscription,
          Content.date_inventaire,
          Content.designation,
          Content.fournisseur,
          Content.prix_unitaire,
        ];
        ec = 6;
        break;
      case 'fiche':
        valuesToInsert = [
          ligne - 21,
          Content.designation,
          Content.num_inventaires,
          Content.reste,
          Content.entree,
          Content.sortie,
          Content.quantite,
          Content.quantite_phys,
          parseInt(Content.quantite) - parseInt(Content.quantite_phys),
          Content.raison,
        ];
        ec = 10;
      default:
        break;
    }
    const range = `A${rowIndex}:${String.fromCharCode(
      64 + valuesToInsert.length
    )}${rowIndex}`;
    const updateRequest = {
      spreadsheetId: idCopy,
      range,
      valueInputOption: 'USER_ENTERED',
      resource: {
        range,
        values: [valuesToInsert],
      },
    };
    const response = await sheets.spreadsheets.values.update(updateRequest);
    console.log(
      'New row inserted at index',
      rowIndex,
      'with values',
      valuesToInsert
    );
    if (
      type != 'sortie' &&
      type != 'decharge' &&
      type != 'registre' &&
      type != 'fiche'
    ) {
      const res = await sheets.spreadsheets.batchUpdate({
        spreadsheetId: idCopy,
        requestBody: {
          requests: [
            {
              mergeCells: {
                range: {
                  startColumnIndex: sc,
                  startRowIndex: rowIndex - 1,
                  endColumnIndex: ec,
                  endRowIndex: rowIndex,
                },
                mergeType: 'MERGE_ALL',
              },
            },
          ],
        },
      });
    } else {
      for (sc = 0; sc < ec; sc++) {
        const res2 = await sheets.spreadsheets.batchUpdate({
          spreadsheetId: idCopy,
          requestBody: {
            requests: [
              {
                updateBorders: {
                  range: {
                    sheetId: 0,
                    startColumnIndex: sc,
                    startRowIndex: rowIndex - 1,
                    endColumnIndex: sc + 1,
                    endRowIndex: rowIndex,
                  },
                  top: {
                    style: 'SOLID',
                    width: 1,
                    color: {
                      red: 0,
                      green: 0,
                      blue: 0,
                    },
                  },
                  bottom: {
                    style: 'SOLID',
                    width: 1,
                    color: {
                      red: 0,
                      green: 0,
                      blue: 0,
                    },
                  },
                  left: {
                    style: 'SOLID',
                    width: 1,
                    color: {
                      red: 0,
                      green: 0,
                      blue: 0,
                    },
                  },
                  right: {
                    style: 'SOLID',
                    width: 1,
                    color: {
                      red: 0,
                      green: 0,
                      blue: 0,
                    },
                  },
                },
              },
            ],
          },
        });
      }
    }
    if (type === 'commande') {
      const res2 = await sheets.spreadsheets.batchUpdate({
        spreadsheetId: idCopy,
        requestBody: {
          requests: [
            {
              updateBorders: {
                range: {
                  sheetId: 0,
                  startColumnIndex: 0,
                  startRowIndex: rowIndex - 1,
                  endColumnIndex: 2,
                  endRowIndex: rowIndex,
                },
                top: {
                  style: 'SOLID',
                  width: 1,
                  color: {
                    red: 0,
                    green: 0,
                    blue: 0,
                  },
                },
                bottom: {
                  style: 'SOLID',
                  width: 1,
                  color: {
                    red: 0,
                    green: 0,
                    blue: 0,
                  },
                },
                left: {
                  style: 'SOLID',
                  width: 1,
                  color: {
                    red: 0,
                    green: 0,
                    blue: 0,
                  },
                },
                right: {
                  style: 'SOLID',
                  width: 1,
                  color: {
                    red: 0,
                    green: 0,
                    blue: 0,
                  },
                },
              },
            },
          ],
        },
      });
    }
    if (type === 'commande') {
      const res3 = await sheets.spreadsheets.batchUpdate({
        spreadsheetId: idCopy,
        requestBody: {
          requests: [
            {
              updateBorders: {
                range: {
                  sheetId: 0,
                  startColumnIndex: 1,
                  startRowIndex: rowIndex - 1,
                  endColumnIndex: 3,
                  endRowIndex: rowIndex,
                },
                top: {
                  style: 'SOLID',
                  width: 1,
                  color: {
                    red: 0,
                    green: 0,
                    blue: 0,
                  },
                },
                bottom: {
                  style: 'SOLID',
                  width: 1,
                  color: {
                    red: 0,
                    green: 0,
                    blue: 0,
                  },
                },
                left: {
                  style: 'SOLID',
                  width: 1,
                  color: {
                    red: 0,
                    green: 0,
                    blue: 0,
                  },
                },
                right: {
                  style: 'SOLID',
                  width: 1,
                  color: {
                    red: 0,
                    green: 0,
                    blue: 0,
                  },
                },
              },
            },
          ],
        },
      });
    }
    console.log('style updated');
  } catch (error) {
    console.error('Error inserting row:', error);
  }
}
async function getCopy(id) {
  try {
    // Charger les informations d'identification OAuth 2.0 depuis le fichier
    // Autoriser l'accès à l'API Google Drive et Google Sheets
    const auth = new google.auth.GoogleAuth({
      keyFile: credentialsPath,
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });
    console.log('connected');
    // Créer une instance de l'API Google Sheets
    const sheets = await google.sheets({ version: 'v4', auth });
    const newSheet = await sheets.spreadsheets.create({
      resource: {
        properties: {
          title: 'Copie',
        },
      },
    });
    const newSpreadsheetId = newSheet.data.spreadsheetId;

    const sourceSheet = await sheets.spreadsheets.get({
      spreadsheetId: id,
    });
    const sourceValues = sourceSheet.data.sheets.values();
    console.log({ newSpreadsheetId });
    await sheets.spreadsheets.values.update({
      spreadsheetId: newSpreadsheetId,
      valueInputOption: 'USER_ENTERED',
      range: 'A1:F36',
      resource: {
        values: sourceValues,
      },
    });
    return newSpreadsheetId;
  } catch (error) {
    console.error('Error inserting row:', error);
  }
}
async function generatePDF(idCopy, folder, filename) {
  try {
    const auth = new google.auth.GoogleAuth({
      keyFile: credentialsPath,
      scopes: [
        'https://www.googleapis.com/auth/drive',
        'https://www.googleapis.com/auth/drive.file',
      ],
    });
    console.log('auth');

    // Créer une instance de l'API Google Sheets
    let drive = await google.drive({ version: 'v3', auth });
    // Exporter la copie en PDF
    const pdfExportResponse = await drive.files.export(
      {
        fileId: idCopy,
        mimeType: 'application/pdf',
      },
      { responseType: 'stream' }
    );
    let PDFpath = path.join('backend', folder, `${filename}.pdf`);
    const pdfFile = fs.createWriteStream(PDFpath);
    pdfExportResponse.data.pipe(pdfFile);

    console.log('PDF exported successfully.');
  } catch (error) {
    console.error('Error:', error);
  }
}
async function generateCSV(idCopy, folder, filename) {
  try {
    const auth = new google.auth.GoogleAuth({
      keyFile: credentialsPath,
      scopes: [
        'https://www.googleapis.com/auth/drive',
        'https://www.googleapis.com/auth/drive.file',
      ],
    });
    console.log('auth');

    // Créer une instance de l'API Google Sheets
    let drive = await google.drive({ version: 'v3', auth });
    // Exporter la copie en PDF
    const pdfExportResponse = await drive.files.export(
      {
        fileId: idCopy,
        mimeType:
          'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      },
      { responseType: 'stream' }
    );
    let CSVpath = path.join('backend', folder, `${filename}.xlsx`);
    const csvFile = fs.createWriteStream(CSVpath);
    pdfExportResponse.data.pipe(csvFile);

    console.log('CSV exported successfully.');
  } catch (error) {
    console.error('Error:', error);
  }
}
async function deleteRows(ligneD, ligneF, id) {
  try {
    // Charger les informations d'identification OAuth 2.0 depuis le fichier
    const auth = new google.auth.GoogleAuth({
      keyFile: credentialsPath,
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });
    console.log('connected');
    // Créer une instance de l'API Google Sheets
    const sheets = await google.sheets({ version: 'v4', auth });

    // Envoyer la demande de mise à jour
    const response = await sheets.spreadsheets.batchUpdate({
      spreadsheetId: id,
      requestBody: {
        requests: [
          {
            deleteDimension: {
              range: {
                sheetId: 0,
                dimension: 'ROWS',
                startIndex: ligneD - 1,
                endIndex: ligneF,
              },
            },
          },
        ],
      },
    });
    console.log('Rows deleted');
  } catch (error) {
    console.error('Error updating cell:', error);
  }
}
async function addBorder(rowIndex, idCopy, sc, ec) {
  try {
    // Charger les informations d'identification OAuth 2.0 depuis le fichier
    const auth = new google.auth.GoogleAuth({
      keyFile: credentialsPath,
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });
    console.log('connected');
    // Créer une instance de l'API Google Sheets
    const sheets = await google.sheets({ version: 'v4', auth }); // Remplacez par l'indice de ligne où vous voulez insérer

    const res = await sheets.spreadsheets.batchUpdate({
      spreadsheetId: idCopy,
      requestBody: {
        requests: [
          {
            updateBorders: {
              range: {
                sheetId: 0,
                startColumnIndex: sc,
                startRowIndex: rowIndex - 1,
                endColumnIndex: ec,
                endRowIndex: rowIndex,
              },
              top: {
                style: 'SOLID',
                width: 1,
                color: {
                  red: 0,
                  green: 0,
                  blue: 0,
                },
              },
              bottom: {
                style: 'SOLID',
                width: 1,
                color: {
                  red: 0,
                  green: 0,
                  blue: 0,
                },
              },
              left: {
                style: 'SOLID',
                width: 1,
                color: {
                  red: 0,
                  green: 0,
                  blue: 0,
                },
              },
              right: {
                style: 'SOLID',
                width: 1,
                color: {
                  red: 0,
                  green: 0,
                  blue: 0,
                },
              },
            },
          },
        ],
      },
    });
  } catch (error) {
    console.error('Error inserting row:', error);
  }
}
async function uploadImageToDrive(filePath, fileName) {
  const auth = new google.auth.GoogleAuth({
    keyFile: credentialsPath,
    scopes: [
      'https://www.googleapis.com/auth/drive',
      'https://www.googleapis.com/auth/drive.file',
    ],
  });
  console.log('auth');

  // Créer une instance de l'API Google Sheets
  let drive = await google.drive({ version: 'v3', auth });

  const fileMetadata = {
    name: fileName,
    mimeType: 'image/jpeg',
  };

  const media = {
    mimeType: 'image/jpeg',
    body: fs.createReadStream(filePath),
  };

  const res = await drive.files.create({
    resource: fileMetadata,
    media: media,
    fields: 'id',
  });

  const fileId = res.data.id;

  // Rendre le fichier public
  await drive.permissions.create({
    fileId: fileId,
    requestBody: {
      role: 'reader',
      type: 'anyone',
    },
  });

  // Obtenir l'URL du fichier
  const file = await drive.files.get({
    fileId: fileId,
    fields: 'webViewLink',
  });

  return file.data.webViewLink;
}
async function insertImageURLInSheet(spreadsheetId, imageURL) {
  const auth = new google.auth.GoogleAuth({
    keyFile: credentialsPath,
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
  });

  console.log('connected');

  // Créer une instance de l'API Google Sheets
  const sheets = google.sheets({ version: 'v4', auth });

  // Fonction pour extraire l'ID de fichier de l'URL Google Drive
  function extractFileId(driveUrl) {
    const match = driveUrl.match(/\/d\/([a-zA-Z0-9_-]+)/);
    return match ? match[1] : null;
  }

  // Extraire l'ID du fichier de l'URL
  const fileId = extractFileId(imageURL);
  if (!fileId) {
    console.error('Invalid Google Drive URL');
    return;
  }

  // Créer l'URL de visualisation directe
  const directImageURL = `https://drive.google.com/uc?export=view&id=${fileId}`;

  // Créer la requête pour insérer l'URL de l'image
  const request = {
    spreadsheetId: spreadsheetId,
    range: 'A2',
    valueInputOption: 'USER_ENTERED',
    resource: {
      values: [[`=IMAGE("${directImageURL}"; 1)`]],
    },
  };

  try {
    const response = await sheets.spreadsheets.values.update(request);
    console.log('Cell updated:', response.data);
  } catch (err) {
    console.error('Error updating cell:', err);
  }
}
module.exports = {
  generatePDF,
  getCopy,
  updateCel,
  addRow,
  deleteRows,
  addBorder,
  generateCSV,
  uploadImageToDrive,
  insertImageURLInSheet,
};
