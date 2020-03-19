import { Component, OnInit } from '@angular/core';
import { Employee } from 'src/app/shared/employee.model';
import { EmployeeService } from 'src/app/shared/employee.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {
  list: Employee[];
  constructor(private service: EmployeeService,
    private firestore: AngularFirestore,
    private toastr: ToastrService) { }

  ngOnInit() {
    this.service.getEmployees().subscribe(actionArray => {
      this.list = actionArray.map(item => {
        return {
          id: item.payload.doc.id,
          ...item.payload.doc.data
        } as Employee;
      });
    });
  }
    onEdit(emp: Employee){
      this.service.formData=Object.assign({}, emp);
    }
    onDelete(id: string){
      if(confirm("Do you really want to delete this employee record?")){
        this.firestore.doc('employees/'+id).delete()
        this.toastr.warning('Employee record deleted succesfully', 'Employee Register')
      }
    }
  }
