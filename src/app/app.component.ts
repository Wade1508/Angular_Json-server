import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from './dialog/dialog.component';
import { ApiService } from './services/api.service';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'Angular-CRUD';
  displayedColumns: string[] = ['productName', 'category', 'date', 'freshness', 'price', 'comment', 'action'];
  dataSource!: MatTableDataSource<any>;
  products! : any[];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private dialog : MatDialog,
    private api : ApiService,
    ){};

    ngOnInit(): void {
      this.getAllProducts();
    }

  openDialog() {
    this.dialog.open(DialogComponent, {
      width : '40%',
    }).afterClosed().subscribe({
      next : () =>{
        this.getAllProducts();
      }
    });
  }

  getAllProducts(){
    this.api.getProduct().subscribe({
      next : (res) => {
        this.products = res;
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error : ()=> {
        alert("Error while fetching the records!!");
      }
    });
  }

  editProduct(row : any){
    this.dialog.open(DialogComponent, {
      width : '40%',
      data : row,
    }).afterClosed().subscribe({
      next : () =>{
        this.getAllProducts();
      }
    })
  }

  delProductById(p : any){
    let conf = confirm("Voulez vous vraiment supprimer le produit ?");
    if (conf == false) return;
    this.api.deleteProduct(p.id).subscribe({
        next : () =>{
          this.getAllProducts();
        },
        error : () =>{
          alert("Produit introuvable");
        }
      });
    }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
