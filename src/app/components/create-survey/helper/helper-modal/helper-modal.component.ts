import {Component} from '@angular/core';

@Component({
  selector: 'app-helper-modal',
  templateUrl: './helper-modal.component.html'
})
export class HelperModalComponent {

  page: number = 1;

  helpPages =
    ['<p>Eine Umfrage besteht aus einem oder mehreren <b>Frageblöcken</b>. ' +
    'Zu jedem Frageblock gehören wiederum eine oder mehrere <b>Fragen</b>. ' +
    'Dadurch können Sie Ihre Fragen thematisch gruppieren und der Umfrage eine Struktur verleihen.</p>' +
    '<p class="mb-0">Sobald Sie die Erstellung der Umfrage abgeschlossen haben, erhalten sie zwei Links. ' +
    'Mit diesen können Sie die Umfrage zur Teilnahme weiterleiten bzw. die Ergebnisse einsehen.</p>',

      '<p>Geben Sie zunächst den <b>Titel</b> der Umfrage und optional auch eine <b>Beschreibung</b> ein.</p>' +
      '<p>Die Beschreibung wird dem/der Nutzer:in vor der Teilnahme angezeigt.</p>',

      '<p>Sollten Sie Ihre Umfrage <b>öffentlich zugänglich</b> machen, so wird diese auf der Startseite ' +
      'unter \'Offene Umfragen\' jedem Nutzer zur Verfügung gestellt. ' +
      'Die Umfrage wird dort angezeigt bis das Ende der Laufzeit erreicht ist.</p>' +
      '<p>Sie erhalten weiterhin einen Link, mit dem Sie die Umfrage weiterleiten können.</p>',

      '<p>Sollten Sie die Teilnahme an Ihrer Umfrage als <b>ausschließlich anonym</b> einstellen, werden die Teilnehmer:innen ' +
      'bei Abgabe der Antworten <b>nicht</b> nach dem Namen gefragt.</p>' +
      '<p>Andernfalls erscheint zum Schluss der Teilnahme ein Eingabefeld, bei dem die Teilnehmer:innen optional Ihren Namen ' +
      'eingeben können.</p>',

      '<p>Nachdem Sie einen Frageblock erstellt haben, können Sie diesen eine <b>Frage hinzufügen.</b></p>' +
      '<p>Mithilfe des Drop-Down-Menüs \'Fragetyp auswählen\' können Sie sich für einen bestimmten Fragetyp entscheiden.</p>' +
      '<p>Wenn Sie die Frage als \'Erforderlich\' markieren. Wird der/die Teilnehmer:in dazu aufgefordert, die Frage ' +
      'zu beantworten.</p>',

      '<p>Falls Sie eine Auswahlfrage erstellen, können Sie darüber hinaus zwischen <b>Single- ' +
      'und Multiple Choice</b> entscheiden (siehe \'Mehrfachauswahl\').</p>' +
      '<p>Bei einer Multiple-Choice-Frage können Sie mit den Feldern \'Minimum\' und \'Maximum\' entscheiden, ' +
      'wie viele Antwortmöglichkeiten der/die Teilnehmer:in beim Beantworten auswählen soll/kann.</p>',

      '<p>Wenn Sie eine Antwortmöglichkeit mit einem <b>Textfeld</b> versehen, wird der/die Teilnehmer:in bei Auswahl ' +
      'dieser Möglichkeit dazu aufgefordert, dieses Textfeld auszufüllen.</p>' +
      '<p>Des weiteren können Sie einem Textfeld einen <b>Platzhaltertext</b> hinzufügen, wie z.B. \'Warum?\' / \'Warum nicht?\'. ' +
      'Dieser wird durch die Eingabe des/der Teilnehmer:in überschrieben.</p>',

      '<p>Bei einer <b>Rankingfrage</b> wird der/die Teilnehmer:in dazu aufgefordert die von Ihnen gestellten Auswahlmöglichkeiten ' +
      'nach bestimmten Kriterien zu sortieren.</p>' +
      '<p>Mit den Textlabeln können Sie dabei die Skala darstellen, an der sich der/die Teilnehmer:in orientieren kann.</p>',

      '<p>Die Reihenfolge der Frageblöcke, Fragen und Antwortmöglichkeiten lässt sich mithilfe von <b>Drag & Drop</b> umändern.</p>',

      '<p>Vor dem endgültigen Speichern der Umfrage werden Sie gebeten einen <b>Zeitraum</b> anzugeben, in dem die erstellte ' +
      'Umfrage zur Teilnahme freigegeben wird. ' +
      'Die Ergebnisse der Umfrage können unabhängig von dem Zeitraum eingesehen werden.</p>' +
      '<p>Zusätzlich können Sie Ihren <b>Namen</b> als Umfrageersteller:in eintragen. Dieser ist für die Teilnehmer:innen der ' +
      'Umfrage sichtbar.</p>']

  goBack() {
    this.page -= 1;
  }

  goNext() {
    this.page += 1;
  }
}
