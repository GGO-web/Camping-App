import { AssetsIconsType } from '../matherialUI';

export const EFitnessUnits = {
  steps: 'steps',
  miles: 'miles',
};

export enum EFitnessTrackerTypes {
  'running',
  'hiking',
}

export interface IFitnessTracker {
  id?: string,
  target: number,
  unit: string,
  icon: AssetsIconsType,
  title: string,
  currentValue: number,
}
