import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BreadcrumbService {

  routesMapper: Map<string, string> = new Map([
    ['index', 'Αρχική σελίδα'],
    ['index/employer', 'Αρχική σελίδα εργοδότη'],
    ['index/faq-student', 'Συχνές Ερωτήσεις φοιτητή'],
    ['index/faq-employer', 'Συχνές Ερωτήσεις εργοδότη'],
    ['index/about', 'Σχετικά με τον Άτλας'],
    ['index/login', 'Σύνδεση'],
    ['index/register', 'Εγγραφή'],
    ['index/register/student', 'Εγγραφή φοιτητή'],
    ['index/register/employer', 'Εγγραφή εργοδότη'],
    ['index/profile', 'Προφίλ Χρήστη'],
    ['index/profile/edit', 'Επεξεργασία Προφίλ Χρήστη'],
    ['index/employer/new-internship', 'Νέα αγγελία πρακτική άσκησης'],
    ['index/employer/internships', 'Αγγελίες πρακτικής άσκησης Παρόχου'],
    ['index/internships/examine', 'Προβολή αγγελίας πρακτικής άσκησης'],
    ['index/employer/internships/examine', 'Προβολή αγγελίας πρακτικής άσκησης για πάροχο'],
    ['index/employer/internships/update', 'Αλλαγή αγγελίας πρακτικής άσκησης'],
    ['index/internships/results', 'Αποτελέσματα αναζήτησης'],
    ['index/student/applications', 'Κατάσταση αιτήσεων πρακτικής άσκησης'],
    ['index/under-dev', 'Σελίδα υπό ανάπτυξη'],
  ]);

  constructor() { }

  getBreadcrumb(url: string[]): Array<[string, string]> {

    let breadcrumb: Array<[string, string]> = [];

    // remove first element of url array
    url.shift();

    // if url array has a result string in the end, remove everything after it
    if (url[url.length - 1].includes('results')) {


      url[url.length - 1] = 'results';
    }

    // start building path
    let path: string = url[0];

    // iterate over url array
    for (let i = 0; i < url.length; i++) {

      // if path exists in routesMapper
      if (this.routesMapper.has(path)) {

        let tempPath: string = path;

        if (path === 'index/profile' || path === 'index/profile/edit') {
          tempPath += '/' + url[url.length - 1];
        }

        // add path to breadcrumb
        breadcrumb.push([this.routesMapper.get(path) as string, tempPath]);
      }

      // concatenate next element of url array to path
      path += '/' + url[i + 1];
    }

    // return breadcrumb
    return breadcrumb;
  }
}
