export default function() {
  this.get('/tasks/:id', 'task');
  this.get('/tasks', 'tasks');
  this.put('/tasks/:id');
  this.del('/tasks/:id');
}
