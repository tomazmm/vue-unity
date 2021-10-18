export interface UnityInstance {
    Module: unknown | undefined,
    Quit: function | undefined,
    SendMessage: function | undefined,
    SetFullscreen: function | undefined,
}
