import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { NgForm, FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { GameService } from '../services/games.service';
@Component({
  selector: 'creategame',
  templateUrl: './addGame.component.html'
})
export class creategameComponent implements OnInit {
  gameForm: FormGroup;
  title: string = "Create";
  id: number;
  errorMessage: any;
  file: any;

  constructor(private _fb: FormBuilder, private _avRoute: ActivatedRoute,
    private _gameService: GameService, private _router: Router, private cd: ChangeDetectorRef) {
    if (this._avRoute.snapshot.params["id"]) {
      this.id = this._avRoute.snapshot.params["id"];
    }

    this.gameForm = this._fb.group({
      id: 0,
      gameName: ['', [Validators.required]],
      gameImageControl: ['', [Validators.required]],
      gameUrl: ['', [Validators.required]],
      gameImage: [''],
      gameImageName: [''],
      gameImageType: [''],
    })
  }

  ngOnInit(): void {
    if (this.id > 0) {
      this.title = "Edit";
      this._gameService.getGamesById(this.id)
        .subscribe(resp => this.gameForm.setValue(resp)
          , error => this.errorMessage = error);
    }
  }

  save() {

    if (!this.gameForm.valid) {
      return;
    }

    if (this.title == "Create") {
      this._gameService.saveGames(this.gameForm.value)
        .subscribe((data) => {
          this._router.navigate(['/games']);
        }, error => this.errorMessage = error)
    }
    else if (this.title == "Edit") {
      this._gameService.updateGames(this.id, this.gameForm.value)
        .subscribe((data) => {
          this._router.navigate(['/games']);
        }, error => this.errorMessage = error)
    }
  }

  cancel() {
    this._router.navigate(['/games']);
  }

  get gameName() { return this.gameForm.get('gameName'); }
  get gameImage() { return this.gameForm.get('gameImage'); }
  get gameUrl() { return this.gameForm.get('gameUrl'); }

  get gameImageControl() { return this.gameForm.get('gameImageControl'); }
  get gameImageName() { return this.gameForm.get('gameImageName'); }
  get gameImageType() { return this.gameForm.get('gameImageType'); }

  onFileChange(event) {
    const reader = new FileReader();

    if (event.target.files && event.target.files.length) {
      [this.file] = event.target.files;
      reader.readAsDataURL(this.file);

      reader.onload = () => {
        this.gameForm.patchValue({
          [this.file]: reader.result
        });

        this.gameForm.controls.gameImage.setValue(reader.result);
        this.gameForm.controls.gameImageName.setValue(this.file.name);
        this.gameForm.controls.gameImageType.setValue(this.file.type);

        // need to run CD since file load runs outside of zone
        this.cd.markForCheck();
      };
    }
  }

}
