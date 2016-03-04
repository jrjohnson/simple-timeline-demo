import moment from 'moment';

export default function(server) {
  let today = moment();
  server.create('task', {
    name: 'single long event name',
    startDate: today.toDate(),
    endDate: today.toDate(),
  });
  server.create('task', {
    name: 'multi',
    startDate: today.clone().add(1, 'day').toDate(),
    endDate: today.clone().add(2, 'days').toDate(),
  });
  server.create('task', {
    name: 'multi2',
    startDate: today.clone().add(4, 'day').toDate(),
    endDate: today.clone().add(8, 'days').toDate(),
  });

  for (let i = 0; i < 5; i++) {
    server.create('task', {
      name: 'task ' + i,
      startDate: today.clone().add(i, 'days').toDate(),
      endDate: today.clone().add(i, 'days').toDate(),
    });
  }
}
