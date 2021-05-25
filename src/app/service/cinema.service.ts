import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CinemaService {

  public host:string="http://localhost:8080"

  constructor(private  http:HttpClient) { }

  public getvilles(){
    return this.http.get(this.host+"/villes");
  }
  public getcinemas(v){
    return this.http.get(v._links.cinemas.href);
  }
  public getsalles(c){
    return this.http.get(c._links.salles.href);
  }
  public getprojections(salle){
    let url=salle._links.projections.href.replace("{?projection}","");
    return this.http.get(url+"?projection=p1");
  }
  public getplaces(p){
    let url=p._links.tickets.href.replace("{?projection}","");
    return this.http.get(url+"?projection=ticketproj");
  }
}
