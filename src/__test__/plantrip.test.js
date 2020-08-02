import 'babel-polyfill';
import { plantrip , getDataFromServers } from '../client/js/plantrip';
// Test if the plantrip method is defined
describe('to check if plantrip() is defined' , () => {
    test('True, plantrip() is defined', async () => expect(plantrip).toBeDefined() );
});
// Test if the getDataFromServers method is defined
describe('to check if getDataFromServers() is defined' , () => {
    test('True, getDataFromServers() is defined', async () => expect(getDataFromServers).toBeDefined() );
});