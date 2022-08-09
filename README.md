# OypuGame

## Goal
Create an easily accessible multiplayer version of PuyoPuyo, resembling Tetris Friends.

## Overview
OypuGame is the game/user side of the Oypu online game. Oypu is a PuyoPuyo-like puzzle game played entirely in the web with online multiplayer functionality. Online functionality is aided by [OypuServer](https://www.github.com/taliyos/OypuServer).

## Technologies
OypuGame is created with Phaser and communication with OypuServer is made through Socket.io.

## Original Version
A while back, I made a version of PuyoPuyo that you can still play. It's not perfect and forgoes a lot of the additional features. Try it out on [itch.io](https://taliyos.itch.io/puyojs) ([Source Code](https://www.github.com/taliyos/puyojs)).

## RCOS Proposal
[View on Google Docs](https://docs.google.com/document/d/1eXm5zfqGpvBiPyBLLVvg5sBEhloP5CbykJFItqMcX3c/edit?usp=sharing)

## Features
 - [ ] Offline Gameplay 
   - [X] Piece Rotation
   - [X] Piece Detection
     - [X] Chain Removal
     - [X] Sprite Swaps
   - [X] Piece Gravity
   - [X] Next Piece Preview
   - [ ] Scoring
     - [X] Combo Detection
     - [X] Score Display
     - [ ] Score Gained Display
 - [X] Custom Piece Sprites
   - [X] Piece Sprite Animations
 - [ ] Board Sprite
 - [ ] Online "versus" Gameplay
   - [ ] Server Multiplayer
   - [ ] Multiple Displayed Boards
   - [ ] Player Garbage Interactivity
   - [ ] Account Login
 - [ ] Stats Menu
 - [ ] Rankings
   - [ ] "Elo" or other system

## Current Maintainers
- [Charles R](https://www.github.com/taliyos)

## License
OypuGame is licensed under the MIT License. See [LICENSE](LICENSE) for additional details.
