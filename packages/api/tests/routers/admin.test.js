import chai from 'chai';
import chaiHttp from 'chai-http';
import faker from 'faker';
import mongoose from 'mongoose';
import { expect } from 'chai';

import server from '../../app.js';

chai.use(chaiHttp);

let token;

