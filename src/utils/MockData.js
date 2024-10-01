import { faker } from '@faker-js/faker';
import moment from 'moment';

export const generateUser = activeRate => {
    const _uuid = faker.string.uuid();

    const userType = Math.random() > activeRate ? "Advertiser" : "Subscriber";
    let firstName, lastName, sex;
    if (userType === "Subscriber") {
        sex = Math.random() > .5 ? 'male' : 'female';
        firstName = faker.person.firstName(sex);
        lastName = faker.person.lastName(sex);
    }

    const fullName = userType === "Advertiser" ? faker.company.name() : faker.person.fullName({ sex, firstName, lastName });
    const userName = userType === "Advertiser" ? faker.internet.userName({ firstName: fullName }) : faker.internet.userName({ firstName, lastName });
    const email = userType === "Advertiser" ? faker.internet.email({ firstName: fullName }) : faker.internet.email({ firstName, lastName });
    const joinDate = faker.date.between({ from: '2020-01-01T00:00:00.000Z', to: '2024-01-01T00:00:00.000Z' });
    const isActive = Math.random() > activeRate ? true : false;
    const inactiveDate = !isActive ? faker.date.between({ from: joinDate, to: '2024-01-01T00:00:00.000Z' }) : null;

    return ({
        _uuid,
        userName,
        fullName,
        email,
        joinDate,
        userType,
        isActive,
        inactiveDate,
        firstName,
        lastName
    });
}

export const generateSong = (_userId, userJoined) => {
    const _uuid = faker.string.uuid();
    const songName = faker.music.songName();
    const album = faker.music.album();
    const artist = faker.music.artist();
    const dateStreamed = _userId ? faker.date.between({ from: userJoined, to: '2024-01-01T00:00:00.000Z' }) : null;

    let max = faker.number.int({ max: 30 })
    for (let i = 0; i < 9; i++){
        const bool = Math.random() > .2;
        if (bool) max *= 10;
        else break;
    }

    const streamCount = faker.number.int({ max });
    const lastStreamedBy = _userId || null;

    return ({
        _uuid,
        songName,
        album,
        artist,
        dateStreamed,
        streamCount,
        lastStreamedBy
    });
}

export const generateRevenue = user => {

    const { userType } = user;

    let amount;
    if (userType === "Subscriber") {
        const { userJoined, inactiveDate } = user;
        const subscriptionCostPerMonth = 11.99;
        const a = moment(userJoined);
        const b = !!inactiveDate ? moment(inactiveDate) : moment();
        const subscribedTime = a.diff(b, 'months', true);
        amount = parseFloat((subscriptionCostPerMonth * subscribedTime).toFixed(2));
    } else { // "Advertiser"
        amount = parseFloat(faker.finance.amount({ max: 10000 }));
    }

    const _uuid = faker.string.uuid();

    return ({
        _uuid,
        userId : user._uuid,
        amount
    });
}