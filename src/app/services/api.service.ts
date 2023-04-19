import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  lienBd : string = "http://localhost:3000/productList/";

  constructor(private http : HttpClient) { }

  postProduct(data : any){
    return this.http.post<any>(this.lienBd,data)
  }

  getProduct(){
    return this.http.get<any>(this.lienBd)
  }

  putProduct(data : any, id: number){
    return this.http.put<any>(this.lienBd+id,data)
  }

  deleteProduct(id : number){
    return this.http.delete<any>(this.lienBd+id);
  }
}
