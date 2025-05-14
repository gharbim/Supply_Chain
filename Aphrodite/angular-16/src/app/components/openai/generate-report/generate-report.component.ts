import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { GenerateReportService } from 'src/app/services/generate-report.service';
import { EmailService } from 'src/app/services/email.service';
import { jsPDF } from 'jspdf';  
import { saveAs } from 'file-saver';  

@Component({
  selector: 'app-generate-report',
  templateUrl: './generate-report.component.html',
  styleUrls: ['./generate-report.component.scss']
})
export class GenerateReportComponent {
  public isLoading = false;
  public report: string = '';  
  public selectedProfile: string = '';
  public errorMessage: string = '';
  public role: string = '';
  public userPrompt: string = '';

  constructor(
    public authService: AuthService,
    private generateReportService: GenerateReportService,
    private emailService: EmailService
  ) {
    this.role = this.authService.getRole() || '';
  }

  generate() {
    if (!this.selectedProfile) {
      alert('Veuillez sélectionner un profil.');
      return;
    }
    if (!this.userPrompt) {
      alert('Veuillez entrer un prompt.');
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';

    this.generateReportService.generateReport(this.selectedProfile, this.userPrompt).subscribe(
      (response: any) => {
        this.isLoading = false;
        this.report = response.report;  // ⚡ Ici : accéder à response.report
      },
      (error: any) => {
        this.isLoading = false;
        this.errorMessage = 'Erreur lors de la génération du rapport';
        console.error(error);
      }
    );
  }

  downloadPDF() {
    const doc = new jsPDF();
    const logoUrl = 'assets/logo_final.png';

    doc.addImage(logoUrl, 'PNG', 10, 10, 50, 50);
    doc.text("Rapport Généré", 10, 60);
    doc.text(this.report, 10, 70);

    doc.save('rapport.pdf');
  }

  downloadWord() {
    const blob = new Blob([this.report], { type: 'application/msword' });
    saveAs(blob, 'rapport.docx');
  }

  sendEmail() {
    if (this.authService.getRole() === 'super-manager') {
      const emailPayload = {
        recipients: ['mohamedoussama.ayadi@esprit.tn'],
        subject: 'Rapport Mensuel',
        body: this.report,
      };

      this.emailService.sendEmail(emailPayload).subscribe(
        () => {
          alert('Le rapport a été envoyé avec succès par email.');
        },
        (error) => {
          console.error(error);
          alert('Erreur lors de l\'envoi du rapport.');
        }
      );
    } else {
      alert('Seul le super-manager peut envoyer des rapports par email.');
    }
  }
}
