export const enum IMAGE_CROP_SETTINGS {
  CARD = "card",
  TOKEN = "token",
  STANDEE = "standee",
  MASTER_BOX = "master-box",
  SERVANT_SUMMON = "servant-summon",
  COMMAND_SEAL = "command-seal",
}

type Crop = {
  position: {
    left: number;
    top: number;
  };
  dimensions: {
    width: number;
    height: number;
  };
};

export const IMAGE_CROP_VALUES: Record<IMAGE_CROP_SETTINGS, Crop> = {
  [IMAGE_CROP_SETTINGS.CARD]: {
    position: {
      left: 30,
      top: 30,
    },
    dimensions: {
      width: 690,
      height: 791,
    },
  },
  [IMAGE_CROP_SETTINGS.SERVANT_SUMMON]: {
    position: {
      left: 30,
      top: 30,
    },
    dimensions: {
      width: 690,
      height: 824,
    },
  },
  [IMAGE_CROP_SETTINGS.TOKEN]: {
    position: {
      left: 40,
      top: 40,
    },
    dimensions: {
      width: 796,
      height: 796,
    },
  },
  [IMAGE_CROP_SETTINGS.STANDEE]: {
    position: {
      left: 30,
      top: 30,
    },
    dimensions: {
      width: 796,
      height: 1353,
    },
  },
  [IMAGE_CROP_SETTINGS.MASTER_BOX]: {
    position: {
      left: 0,
      top: 0,
    },
    dimensions: {
      width: 1300,
      height: 1000,
    },
  },
  [IMAGE_CROP_SETTINGS.COMMAND_SEAL]: {
    position: {
      left: 30,
      top: 30,
    },
    dimensions: {
      width: 690,
      height: 791,
    },
  },
};
