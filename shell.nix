let

    pkgs = import <nixpkgs> { config = {}; overlays = []; };
in

pkgs.mkShellNoCC {
    packages = with pkgs; [
        nodejs_24
        pnpm
    ];

    shellHook = ''
        pnpm install
    '';
}
