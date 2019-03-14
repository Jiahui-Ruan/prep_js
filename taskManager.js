// class Task
// duration integer
// run() => printing out 'Hello World' after duration

function Task(duration) {
    var self = this;
    
    self.duration = duration;
    
    self.run = function() {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                console.log('Task is done ' + self.duration);
                resolve();
            }, self.duration);
        })
    }
}

const task1 = new Task(5000);
const task2 = new Task(1500);
const task3 = new Task(1000);
const task4 = new Task(700);
const task5 = new Task(200);
const task6 = new Task(2000);

// TaskManager
// concurrency integer
// push(task) => execute task.run()

function TaskManager(concurrency) {
    var self = this;
    
    self.concurrency = concurrency;
    self.running_task = 0;
    self.queue = [];

    var run_task = function() {
        if (self.queue.length > 0) {
            let curt_task = self.queue.shift();
            self.running_task++;
            curt_task.run().then(() => {
                self.running_task--;
                run_task();
            })
        }
    }
    
    self.push = function(task) {
        self.queue.push(task);
        if (self.running_task < self.concurrency) {
            run_task();
        }
    }
}

const taskManager = new TaskManager(2);
taskManager.push(task1); // will run
taskManager.push(task2); // will run
taskManager.push(task3); // will wait until any of the previous tasks is done
taskManager.push(task4);
taskManager.push(task5);
taskManager.push(task6);
