const assert = require('assert');

function calculateStateOfHealth(presentCapacity, ratedCapacity) {
  const stateOfHealth = (presentCapacity / ratedCapacity) * 100;
  return stateOfHealth;
}

function classifyBatteriesByHealth(presentCapacities) {
  const ratedCapacity = 120; 
  const classifications = {
    healthy: 0,
    replace: 0,
    failed: 0,
  };

  for (let capacity of presentCapacities) {
    const soh = calculateStateOfHealth(capacity, ratedCapacity);

    if (soh > 80) {
      classifications.healthy++;
    } else if (soh >= 62) {
      classifications.replace++;
    } else {
      classifications.failed++;
    }
  }

  return classifications;
}

function testBucketingByHealth() {
  console.log('Classifying batteries by health...');
  const presentCapacities = [113, 116, 80, 95, 92, 70];
  const batteryClassifications = classifyBatteriesByHealth(presentCapacities);

  assert(batteryClassifications["healthy"] === 2);
  assert(batteryClassifications["replace"] === 3);
  assert(batteryClassifications["failed"] === 1);
  
  const totalCount = presentCapacities.length;
  assert(Object.values(batteryClassifications).reduce((acc, val) => acc + val, 0) === totalCount);

  console.log("Done classifying batteries :)");
}

testBucketingByHealth();
