export class CarList {
    list: car[];

    constructor() {
        this.list = [
            //{ name: 'C-MAX HYBID', code: '128' },
            { name: 'ECOSPORT', code: '137' },
            { name: 'EDGE', code: '100' },
            { name: 'ESCAPE', code: '053' },
            { name: 'EXPEDITION', code: '007' },
            { name: 'EXPLORER', code: '006' },
            { name: 'F-150', code: '008' },
            { name: 'FIESTA', code: '250' },
            { name: 'FLEX', code: '111' },
            //{ name: 'FOCUS', code: '048' },
            //{ name: 'FOCUS ELECTRIC', code: '127' },
            //{ name: 'FOCUS ST', code: '131' },
            { name: 'FORD GT', code: '210' },
            { name: 'FORD PERFORMANCE CARS', code: '902' },
            { name: 'FORD PERFORMANCE TRUCKS', code: '903' },
            { name: 'FUSION', code: '211' },
            { name: 'FUSION ENERGI', code: '252' },
            { name: 'FUSION HYBRID', code: '251' },
            { name: 'MUSTANG', code: '002' },
            { name: 'RANGER', code: '010' },
            { name: 'RAPTOR', code: '084' },
            { name: 'SUPER DUTY (F-250)', code: '012' },
           // { name: 'TAURUS', code: '109' },
            { name: 'TRANSIT', code: '132' },
            { name: 'TRANSIT CONNECT', code: '328' },
            { name: 'TRANSIT CONNECT WAGON', code: '133' },
            { name: '2020 Escape', code: '053' },
            { name: '2020 Super Duty', code: '012' },
            { name: '2020 Transit', code: '132' }
        ]
    }
}

export class car {
    name: string;
    code: string;
}
