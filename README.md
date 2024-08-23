# OAO Frame Template
This is a template for building AI powered frame using [ORA's Onchain AI Oracle](https://docs.ora.io/doc/oao-onchain-ai-oracle/introduction).

## Template Structure
**api** - defines api endpoints, which execute actions and return frame metatags

**lib** - helper functions

**public** - directory containing frame images

## Getting Started
1. copy `.env.example` into `.env` and add values to environment variables
2. modify frame logic as you wish, by changing files within **api** folder
3. run the frame locally: `yarn dev`


## Test Your Frame

1. Run the development server: `yarn dev`
2. Use [ngrok](https://ngrok.com/) to expose your local frame 
3. Test the frame with https://warpcast.com/~/developers/frames

> If you don't want to use ngrok, you can test the frame using local debugger from [frames.js](https://framesjs.org/).

## Deploy to Production
1. run `vercel --prod` to deploy your frame to vercel
2. cast a frame on Farcaster client (eg. [Warpcast](https://warpcast.com/)), using link to the production deployment

## Deploying contracts
In order to develop and deploy contracts for your OAO Frame application, you can use this [template repository](https://github.com/ora-io/Interaction_With_OAO_Template).


## OAO Frame Examples

- [FortuneTeller](https://github.com/hadzija7/fortune-teller-frame)


## Learn More


- [Onchain AI Oracle tutorial](https://docs.ora.io/doc/oao-onchain-ai-oracle/develop-guide/tutorials/interaction-with-oao-tutorial) - understand how to utilise verifiable AI in your dapps.
- [Farcaster docs](https://docs.farcaster.xyz/) - Farcaster docs
- [Base Onchain Kit](https://onchainkit.xyz/) - Base framework for building frames
