import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { CinemaService } from '../service/cinema.service';

@Component({
  selector: 'app-cinema',
  templateUrl: './cinema.component.html',
  styleUrls: ['./cinema.component.css']
})
export class CinemaComponent implements OnInit {

  public villes;public cinemas;public salles;
  public currentville;
  public currentcinema;
  public currentprojection;

  constructor(public cinemaservice:CinemaService) { }

  ngOnInit(): void {
    this.cinemaservice.getvilles().subscribe(data=>{
      this.villes=data;
    },
    err=>{console.log(err);
    })

  }
  ongetcinemas(v){
    this.currentville=v;
    this.salles=undefined;
    this.cinemaservice.getcinemas(v).subscribe(data=>{
      this.cinemas=data;
    },
    err=>{console.log(err);
    })

  }
  ongetsalles(c){
    this.currentcinema=c;
    this.cinemaservice.getsalles(c).subscribe(data=>{
      this.salles=data;
      this.salles._embedded.salles.forEach(salle => {
        this.cinemaservice.getprojections(salle).subscribe(data=>{
          salle.projections=data;
        },
        err=>{console.log(err);
        })
      });
    },
    err=>{console.log(err);
    })

  }
  ongetplaces(p){
    this.currentprojection=p;
    this.cinemaservice.getplaces(p).subscribe(data=>{
      this.currentprojection.tickets=data;
    },
    err=>{console.log(err);
    })
  }

}
