import { AssetsIconsType } from '../matherialUI';

export enum EFitnessUnits {
  'steps',
  'miles',
}

export enum EFitnessTrackerTypes {
  'running',
  'hiking',
}

export interface IFitnessTracker {
  id?: string,
  target: number,
  unit: EFitnessUnits,
  icon: AssetsIconsType,
  title: string,
  currentValue: number,
}
