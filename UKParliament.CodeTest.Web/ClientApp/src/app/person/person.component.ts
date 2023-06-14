import {Component, Inject, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import { PersonViewModel } from "../../models/person-view-model";
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-person',
  templateUrl: './person.component.html',
  styleUrls: ['./person.component.scss']
})
export class PersonComponent {

  model = { id: 4, name: "Bob", dob: new Date(1993, 10, 16), postcode: "G61 3EU", height: 167 };

  headers = ["id", "name", "dob", "postcode", "height"];
  rows = [
    { id: 1, name: "Burt", dob: new Date(1965, 7, 2), postcode: "KW13 6AB", height: 183 },
    { id: 2, name: "Bettie", dob: new Date(1982, 1, 19), postcode: "ZE2 9TG", height: 174 },
    { id: 3, name: "Bill", dob: new Date(1989, 4, 23), postcode: "BN5 9PH", height: 162 },
  ];

  onUpdate(formObj) {
    let values = formObj.value;
    console.log(values);
    let obj: any = {
      id: values.id,
      name: values.name,
      dob: values.dob,
      postcode: values.postcode,
      height: values.height
    };

    this.rows.push(obj);
    formObj.reset();

  }


  ngOnInit() {
  }

  trackById(index: number, data: any): string {
    return data.code;
  }

  // Below is some sample code to help get you started calling the API

  constructor(private http: HttpClient, @Inject('BASE_URL') private baseUrl: string) {
    this.getPersonById(1);
  }

  getPersonById(id: number): void {
    this.http.get<PersonViewModel[]>(this.baseUrl + `api/person/${id}`).subscribe(result => {
    }, error => console.error(error));
  }


}
