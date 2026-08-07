import { computed, effect, inject, Injectable, signal, Signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { toSignal } from '@angular/core/rxjs-interop';
import { CarModel, CarOptions, Color, Config } from './models.type';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ConfiguratorService {
  private http = inject(HttpClient);

  readonly allModels: Signal<CarModel[]> = toSignal(this.http.get<CarModel[]>('models'), { initialValue: [] });

  readonly selectableColors = computed(() => this.currentCar()?.colors);
  readonly selectableOptions = signal<CarOptions | null>(null);

  readonly currentColor = signal<Color | undefined>(undefined);
  readonly currentCar = signal<CarModel | undefined>(undefined);
  readonly currentConfig = signal<Config | undefined>(undefined);
  readonly currentWheelIsYoke = signal<boolean>(false);
  readonly currentTowHitchIsSelected = signal<boolean>(false);

  readonly currentImage = computed(() => {
    const car = this.currentCar();
    const color = this.currentColor();
    if (car && color) return `https://interstate21.com/tesla-app/images/${car.code}/${color.code}.jpg`;
    else return null;
  });

  readonly step2Ready: Signal<boolean> = computed(
    () => this.currentCar() != undefined && this.currentColor() != undefined,
  );
  readonly step3Ready: Signal<boolean> = computed(() => this.step2Ready() && this.currentConfig() != undefined);

  readonly totalCost = computed(() => {
    return (
      (this.currentConfig()?.price ?? 0) +
      (this.currentColor()?.price || 0) +
      (this.currentWheelIsYoke() ? 1000 : 0) +
      (this.currentTowHitchIsSelected() ? 1000 : 0)
    );
  });

  constructor() {
    effect(() => {
      if (this.currentCar()?.code)
        this.http
          .get<CarOptions>('options/' + this.currentCar()?.code)
          .subscribe((options) => this.selectableOptions.set(options));
    });
  }

  selectModel(code: CarModel['code']) {
    const model = this.allModels().find((model) => model.code === code);
    this.currentCar.set(model);
    this.currentColor.set(model?.colors[0]);
    this.currentWheelIsYoke.set(false);
    this.currentTowHitchIsSelected.set(false);
    this.currentConfig.set(undefined);
  }

  selectColor(code: Color['code']) {
    const color = this.selectableColors()?.find((color) => color.code === code);
    this.currentColor.set(color);
  }

  selectConfig(id: string) {
    const config = this.selectableOptions()?.configs.find((c) => c.id === +id);
    this.currentConfig.set(config);
  }

  reset() {
    this.currentCar.set(undefined);
    this.currentColor.set(undefined);
    this.currentConfig.set(undefined);
    this.currentWheelIsYoke.set(false);
    this.currentTowHitchIsSelected.set(false);
  }

  order() {
    const order = {
      car: this.currentCar()?.code,
      color: this.currentColor()?.code,
      config: this.currentConfig()?.id,
      wheelIsYoke: this.currentWheelIsYoke(),
      towHitchIsSelected: this.currentTowHitchIsSelected(),
    };
    console.log(order);
    return of(order);
  }
}
