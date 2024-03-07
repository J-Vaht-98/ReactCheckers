interface IGameSettings {
  // updateSetting:(key,value)=>
}
class GameSettings implements IGameSettings {
  constructor() {
    //try to fetch from local storage
  }
}

export const settings = new GameSettings();
