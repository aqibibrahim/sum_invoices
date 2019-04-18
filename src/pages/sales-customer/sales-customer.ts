import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform,ActionSheetController   } from 'ionic-angular';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
pdfMake.vfs = pdfFonts.pdfMake.vfs;
import { ActionSheet, ActionSheetOptions } from '@ionic-native/action-sheet/ngx';

import { File } from '@ionic-native/file';
import { FileOpener } from '@ionic-native/file-opener';
/**
 * Generated class for the SalesCustomerPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-sales-customer',
  templateUrl: 'sales-customer.html',
})
export class SalesCustomerPage {
  letterObj = {
    to: 'Aqib',
    from: 'Ibrahim',
    text: 'Hy its b'
  }
 
  pdfObj = null;
  myDate = new Date().toISOString();
  constructor(public navCtrl: NavController,private plt: Platform, public navParams: NavParams, private file: File, private fileOpener: FileOpener,private actionSheet: ActionSheet,public actionSheetCtrl: ActionSheetController) {
  }
  
  ionViewDidLoad() {
    console.log('ionViewDidLoad SalesCustomerPage');
  }

  presentActionSheet() {
     {
      let actionSheet = this.actionSheetCtrl.create({
        buttons: [
          {
            text: 'Download Pdf',
            role: 'destructive',
            handler: () => {
              console.log('Destructive clicked');
              this.createPdf();
            }
          },
          
          {
            text: 'Cancel',
            role: 'cancel',
            handler: () => {
              console.log('Cancel clicked');
            }
          }
        ]
      });
   
      actionSheet.present();
    }

   }
   createPdf() {
    var docDefinition = {
      content: [
        { text: 'REMINDER', style: 'header' },
        { text: new Date().toTimeString(), alignment: 'right' },
 
        { text: 'From', style: 'subheader' },
        { text: this.letterObj.from },
 
        { text: 'To', style: 'subheader' },
        this.letterObj.to,
 
        { text: this.letterObj.text, style: 'story', margin: [0, 20, 0, 20] },
 
        {
          ul: [
            'Bacon',
            'Rips',
            'BBQ',
          ]
        }
      ],
      styles: {
        header: {
          fontSize: 18,
          bold: true,
        },
        subheader: {
          fontSize: 14,
          bold: true,
          margin: [0, 15, 0, 0]
        },
        story: {
          italic: true,
          alignment: 'center',
          width: '50%',
        }
      }
    }
    this.pdfObj = pdfMake.createPdf(docDefinition);
    this.downloadPdf();
  }
 
  downloadPdf() {
      console.log(this.file);
    if (this.plt.is('cordova')) {
      this.pdfObj.getBuffer((buffer) => {
        var blob = new Blob([buffer], { type: 'application/pdf' });
 
        // Save the PDF to the data Directory of our App
        this.file.writeFile(this.file.externalDataDirectory,'yDate', blob, { replace: true }).then(fileEntry => {
          // Open the PDf with the correct OS tools
          console.log(this.file.externalDataDirectory);
          //this.fileOpener.open(this.file.externalDataDirectory + 'myletter.pdf', 'application/pdf');
          this.fileOpener.open(this.file.externalDataDirectory + 'myletter.pdf', 'application/pdf')
  .then(() => console.log('File is opened'))
  .catch(e => console.log('Error opening file', e));
        })
      });
    } else {
      // On a browser simply use download!
      this.pdfObj.download();
    }
  }
 }
