import React from 'react';
import { ScrollView } from 'react-native';

import { FitnessTracker } from './FitnessTracker';

import { fitnessTrackers } from '../../../../constants';

export function FitnessTrackers() {
  return (
    <ScrollView>
      {fitnessTrackers.map(([trackerName, tracker]) => (
        <FitnessTracker key={tracker.id} trackerName={trackerName} tracker={tracker} />
      ))}
    </ScrollView>
  );
}
