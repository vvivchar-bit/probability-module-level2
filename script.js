document.addEventListener("DOMContentLoaded", function () {
    const taskContent = document.getElementById("taskContent");
    const buttons = document.querySelectorAll(".task-btn");

    function factorial(n) {
        let result = 1;

        for (let i = 2; i <= n; i++) {
            result *= i;
        }

        return result;
    }

    function combinations(n, k) {
        return factorial(n) / (factorial(k) * factorial(n - k));
    }

    function poisson(lambda, k) {
        return (Math.pow(lambda, k) * Math.exp(-lambda)) / factorial(k);
    }

    function phiDensity(x) {
        return (1 / Math.sqrt(2 * Math.PI)) * Math.exp(-(x * x) / 2);
    }

    function erf(x) {
        const sign = x >= 0 ? 1 : -1;
        x = Math.abs(x);

        const a1 = 0.254829592;
        const a2 = -0.284496736;
        const a3 = 1.421413741;
        const a4 = -1.453152027;
        const a5 = 1.061405429;
        const p = 0.3275911;

        const t = 1 / (1 + p * x);
        const y = 1 - (((((a5 * t + a4) * t) + a3) * t + a2) * t + a1) * t * Math.exp(-x * x);

        return sign * y;
    }

    function normalCdf(x) {
        return 0.5 * (1 + erf(x / Math.sqrt(2)));
    }

    function format(value, digits = 4) {
        return Number(value).toFixed(digits);
    }

    const task9 = Math.pow(0.9, 3);

    const defectProbability =
        0.10 * 0.09 +
        0.70 * 0.08 +
        0.20 * 0.07;

    const bayesSecondFactory = (0.70 * 0.08) / defectProbability;

    const coinExactly3 = combinations(5, 3) / Math.pow(2, 5);
    const coinAtLeast3 =
        (combinations(5, 3) + combinations(5, 4) + combinations(5, 5)) /
        Math.pow(2, 5);

    const np13 = 400 * 0.2;
    const npq13 = 400 * 0.2 * 0.8;
    const sigma13 = Math.sqrt(npq13);
    const x13 = (80 - np13) / sigma13;
    const localLaplace13 = phiDensity(x13) / sigma13;

    const np14 = 400 * 0.2;
    const npq14 = 400 * 0.2 * 0.8;
    const sigma14 = Math.sqrt(npq14);
    const x1task14 = (69.5 - np14) / sigma14;
    const x2task14 = (100.5 - np14) / sigma14;
    const task14Probability = normalCdf(x2task14) - normalCdf(x1task14);

    const lambda15 = 1000 * 0.002;
    const p15exact3 = poisson(lambda15, 3);
    const p15upTo3 =
        poisson(lambda15, 0) +
        poisson(lambda15, 1) +
        poisson(lambda15, 2) +
        poisson(lambda15, 3);
    const p15moreThan3 = 1 - p15upTo3;

    const p16 = 0.4;
    const q16 = 0.6;

    const pX0 = combinations(3, 0) * Math.pow(p16, 0) * Math.pow(q16, 3);
    const pX1 = combinations(3, 1) * Math.pow(p16, 1) * Math.pow(q16, 2);
    const pX2 = combinations(3, 2) * Math.pow(p16, 2) * Math.pow(q16, 1);
    const pX3 = combinations(3, 3) * Math.pow(p16, 3) * Math.pow(q16, 0);

    const tasks = {
        9: `
            <h2>Завдання 9</h2>

            <div class="condition">
                <strong>Умова.</strong>
                Верстат-автомат штампує деталі. Ймовірність того, що за зміну
                не буде випущено жодної бракованої деталі, дорівнює 0,9.
                Знайти ймовірність того, що за три зміни не буде випущено
                жодної бракованої деталі.
            </div>

            <h3>Чому використовуємо саме цю формулу</h3>
            <p>
                Подія “за зміну не буде браку” має повторитися три рази підряд.
                Якщо зміни розглядаються як незалежні, то ймовірності множаться.
            </p>

            <div class="visual-block">
                <strong>Візуальна ідея</strong>
                <div class="factory-row">
                    <div class="card good">1 зміна<br>P = 0,9</div>
                    <div class="card good">2 зміна<br>P = 0,9</div>
                    <div class="card good">3 зміна<br>P = 0,9</div>
                </div>
            </div>

            <h3>Розв’язання</h3>

            <p>Ймовірність для однієї зміни:</p>
            <div class="formula">P = 0,9</div>

            <p>Для трьох незалежних змін:</p>
            <div class="formula">P = 0,9 · 0,9 · 0,9</div>

            <div class="formula">P = 0,9<sup>3</sup> = ${format(task9, 3)}</div>

            <div class="answer">
                Відповідь: P = ${format(task9, 3)}.
            </div>
        `,

        10: `
            <h2>Завдання 10</h2>

            <div class="condition">
                <strong>Умова.</strong>
                На заводі перший цех виробляє 10%, другий — 70%, третій — 20%
                всіх деталей. У їх продукції браку відповідно 9%, 8%, 7%.
                Знайти ймовірність того, що випадково вибрана деталь дефектна.
            </div>

            <h3>Чому використовуємо саме цю формулу</h3>
            <p>
                Деталь може бути виготовлена одним із трьох цехів. Тому подію
                “деталь дефектна” потрібно розглядати через усі можливі джерела
                її виготовлення. Для цього використовується формула повної ймовірності.
            </p>

            <div class="visual-block">
                <strong>Цехи та частки виробництва</strong>
                <div class="factory-row">
                    <div class="card factory">Цех 1<br>10% деталей<br>9% браку</div>
                    <div class="card factory">Цех 2<br>70% деталей<br>8% браку</div>
                    <div class="card factory">Цех 3<br>20% деталей<br>7% браку</div>
                </div>
            </div>

            <h3>Розв’язання</h3>

            <p>Позначимо D — подія “деталь дефектна”.</p>

            <div class="formula">
                P(D) = P(H<sub>1</sub>)P(D|H<sub>1</sub>) +
                P(H<sub>2</sub>)P(D|H<sub>2</sub>) +
                P(H<sub>3</sub>)P(D|H<sub>3</sub>)
            </div>

            <p>Підставляємо числа:</p>

            <div class="formula">
                P(D) = 0,10 · 0,09 + 0,70 · 0,08 + 0,20 · 0,07
            </div>

            <div class="formula">
                P(D) = 0,009 + 0,056 + 0,014
            </div>

            <div class="formula">
                P(D) = ${format(defectProbability, 3)}
            </div>

            <div class="answer">
                Відповідь: P(D) = ${format(defectProbability, 3)}, тобто 7,9%.
            </div>
        `,

        11: `
            <h2>Завдання 11</h2>

            <div class="condition">
                <strong>Умова.</strong>
                На заводі перший цех виробляє 10%, другий — 70%, третій — 20%
                всіх деталей. У їх продукції браку відповідно 9%, 8%, 7%.
                Випадково вибрана деталь виявилась дефектною. Знайти ймовірність
                того, що вона виготовлена другим цехом.
            </div>

            <h3>Чому використовуємо саме цю формулу</h3>
            <p>
                Тут уже відомо, що деталь дефектна. Треба знайти ймовірність
                причини цієї події, тобто з якого цеху вона походить. Для таких задач
                використовується формула Байєса.
            </p>

            <div class="visual-block">
                <strong>Ідея формули Байєса</strong>
                <div class="factory-row">
                    <div class="card factory">Цех 1<br>0,10 · 0,09</div>
                    <div class="card defect">Цех 2<br>0,70 · 0,08</div>
                    <div class="card factory">Цех 3<br>0,20 · 0,07</div>
                </div>
                <p class="note">
                    Потрібно знайти частку другого цеху серед усіх дефектних деталей.
                </p>
            </div>

            <h3>Розв’язання</h3>

            <p>З попереднього завдання:</p>
            <div class="formula">P(D) = ${format(defectProbability, 3)}</div>

            <p>Формула Байєса для другого цеху:</p>
            <div class="formula">
                P(H<sub>2</sub>|D) =
                [P(H<sub>2</sub>)P(D|H<sub>2</sub>)] / P(D)
            </div>

            <p>Підставляємо числа:</p>
            <div class="formula">
                P(H<sub>2</sub>|D) = (0,70 · 0,08) / 0,079
            </div>

            <div class="formula">
                P(H<sub>2</sub>|D) = 0,056 / 0,079
            </div>

            <div class="formula">
                P(H<sub>2</sub>|D) ≈ ${format(bayesSecondFactory, 3)}
            </div>

            <div class="answer">
                Відповідь: P(H₂|D) ≈ ${format(bayesSecondFactory, 3)}, тобто приблизно 70,9%.
            </div>
        `,

        12: `
            <h2>Завдання 12</h2>

            <div class="condition">
                <strong>Умова.</strong>
                Монета підкидається п’ять разів. Знайти ймовірність того, що:
                <br>а) тричі випаде “герб”;
                <br>б) “герб” випаде не менше трьох разів.
            </div>

            <h3>Чому використовуємо саме цю формулу</h3>
            <p>
                Є 5 однакових незалежних випробувань, у кожному з яких можливі
                два результати: герб або не герб. Тому використовується формула Бернуллі.
            </p>

            <div class="visual-block">
                <strong>П’ять підкидань монети</strong>
                <div class="coin-row">
                    <div class="card coin">1</div>
                    <div class="card coin">2</div>
                    <div class="card coin">3</div>
                    <div class="card coin">4</div>
                    <div class="card coin">5</div>
                </div>
            </div>

            <h3>Розв’язання</h3>

            <p>Для чесної монети:</p>
            <div class="formula">p = 1/2, q = 1/2</div>

            <p>Формула Бернуллі:</p>
            <div class="formula">P<sub>n</sub>(k) = C<sub>n</sub><sup>k</sup>p<sup>k</sup>q<sup>n-k</sup></div>

            <p>а) Герб випаде рівно 3 рази:</p>
            <div class="formula">P<sub>5</sub>(3) = C<sub>5</sub><sup>3</sup>(1/2)<sup>5</sup></div>
            <div class="formula">P<sub>5</sub>(3) = 10 / 32 = 5 / 16 = ${format(coinExactly3, 4)}</div>

            <p>б) Герб випаде не менше 3 разів, тобто k = 3, 4, 5:</p>
            <div class="formula">
                P = [C<sub>5</sub><sup>3</sup> + C<sub>5</sub><sup>4</sup> + C<sub>5</sub><sup>5</sup>] / 2<sup>5</sup>
            </div>
            <div class="formula">P = (10 + 5 + 1) / 32 = 16 / 32 = 1/2</div>

            <div class="answer">
                Відповідь: а) 5/16; б) 1/2.
            </div>
        `,

        13: `
            <h2>Завдання 13</h2>

            <div class="condition">
                <strong>Умова.</strong>
                Знайти ймовірність того, що подія A відбудеться рівно 80 разів
                у 400 випробуваннях, якщо ймовірність її настання в кожному
                випробуванні дорівнює 0,2.
            </div>

            <h3>Чому використовуємо саме цю формулу</h3>
            <p>
                Маємо велику кількість випробувань n = 400 і потрібно знайти
                ймовірність рівно одного значення k = 80. Тому застосовується
                локальна теорема Муавра–Лапласа.
            </p>

            <h3>Розв’язання</h3>

            <div class="formula">n = 400, p = 0,2, q = 0,8, k = 80</div>

            <p>Знаходимо математичне сподівання:</p>
            <div class="formula">np = 400 · 0,2 = ${np13}</div>

            <p>Знаходимо дисперсійний множник:</p>
            <div class="formula">npq = 400 · 0,2 · 0,8 = ${npq13}</div>

            <div class="formula">√npq = ${sigma13}</div>

            <p>Нормоване значення:</p>
            <div class="formula">x = (80 - 80) / 8 = ${x13}</div>

            <p>Локальна формула:</p>
            <div class="formula">P<sub>400</sub>(80) ≈ φ(0) / 8</div>

            <div class="formula">P ≈ 0,3989 / 8 ≈ ${format(localLaplace13, 4)}</div>

            <div class="answer">
                Відповідь: P ≈ ${format(localLaplace13, 4)}.
            </div>
        `,

        14: `
            <h2>Завдання 14</h2>

            <div class="condition">
                <strong>Умова.</strong>
                Ймовірність того, що деталь не буде перевірено, дорівнює 0,2.
                Знайти ймовірність того, що серед 400 випадково відібраних деталей
                неперевірених буде від 70 до 100 деталей.
            </div>

            <h3>Чому використовуємо саме цю формулу</h3>
            <p>
                Кількість випробувань велика, а потрібно знайти ймовірність
                потрапляння випадкової величини в інтервал. Тому використовуємо
                інтегральну теорему Муавра–Лапласа.
            </p>

            <h3>Розв’язання</h3>

            <div class="formula">n = 400, p = 0,2, q = 0,8</div>

            <div class="formula">np = 400 · 0,2 = ${np14}</div>
            <div class="formula">npq = 400 · 0,2 · 0,8 = ${npq14}</div>
            <div class="formula">√npq = ${sigma14}</div>

            <p>З урахуванням поправки неперервності:</p>
            <div class="formula">69,5 ≤ X ≤ 100,5</div>

            <p>Нормовані межі:</p>
            <div class="formula">x₁ = (69,5 - 80) / 8 = ${format(x1task14, 4)}</div>
            <div class="formula">x₂ = (100,5 - 80) / 8 = ${format(x2task14, 4)}</div>

            <p>Тоді:</p>
            <div class="formula">P(70 ≤ X ≤ 100) ≈ Φ(${format(x2task14, 4)}) - Φ(${format(x1task14, 4)})</div>

            <div class="formula">P ≈ ${format(task14Probability, 4)}</div>

            <div class="answer">
                Відповідь: P ≈ ${format(task14Probability, 3)}.
            </div>
        `,

        15: `
            <h2>Завдання 15</h2>

            <div class="condition">
                <strong>Умова.</strong>
                Магазин одержав 1000 новорічних пакунків цукерок.
                Ймовірність того, що під час перевезення пакунок буде пошкоджено,
                дорівнює 0,002. Знайти ймовірність того, що магазин одержить
                пошкодженими:
                <br>а) рівно 3 пакунки;
                <br>б) більше 3 пакунків.
            </div>

            <h3>Чому використовуємо саме цю формулу</h3>
            <p>
                Кількість пакунків велика, а ймовірність пошкодження одного пакунка
                дуже мала. У такому випадку зручно використовувати формулу Пуассона.
            </p>

            <div class="visual-block">
                <strong>Ідея задачі</strong>
                <div class="package-row">
                    <div class="card package">1000 пакунків</div>
                    <div class="card defect">p = 0,002</div>
                    <div class="card package">λ = np = 2</div>
                </div>
            </div>

            <h3>Розв’язання</h3>

            <div class="formula">λ = np = 1000 · 0,002 = ${lambda15}</div>

            <p>Формула Пуассона:</p>
            <div class="formula">P(k) = (λ<sup>k</sup> / k!)e<sup>-λ</sup></div>

            <p>а) Рівно 3 пошкоджені пакунки:</p>
            <div class="formula">P(3) = (2<sup>3</sup> / 3!)e<sup>-2</sup></div>
            <div class="formula">P(3) ≈ ${format(p15exact3, 4)}</div>

            <p>б) Більше 3 пошкоджених пакунків:</p>
            <div class="formula">P(X > 3) = 1 - P(X ≤ 3)</div>

            <div class="formula">
                P(X > 3) = 1 - [P(0) + P(1) + P(2) + P(3)]
            </div>

            <div class="formula">
                P(X > 3) = 1 - e<sup>-2</sup>(1 + 2 + 4/2 + 8/6)
            </div>

            <div class="formula">
                P(X > 3) = 1 - e<sup>-2</sup>(1 + 2 + 2 + 4/3)
            </div>

            <div class="formula">P(X > 3) ≈ ${format(p15moreThan3, 4)}</div>

            <div class="answer">
                Відповідь: а) P(3) ≈ ${format(p15exact3, 3)};
                б) P(X > 3) ≈ ${format(p15moreThan3, 3)}.
            </div>
        `,

        16: `
            <h2>Завдання 16</h2>

            <div class="condition">
                <strong>Умова.</strong>
                Проводиться три незалежних випробування, у кожному з яких подія A
                відбувається з ймовірністю 0,4. Розглядається випадкова величина X —
                число появ події A в трьох випробуваннях. Знайти закон розподілу
                випадкової величини X.
            </div>

            <h3>Чому використовуємо саме цю формулу</h3>
            <p>
                Випадкова величина X рахує кількість появ події A у трьох незалежних
                випробуваннях. Тому X має біноміальний розподіл, і для кожного
                значення k використовуємо формулу Бернуллі.
            </p>

            <h3>Розв’язання</h3>

            <div class="formula">n = 3, p = 0,4, q = 0,6</div>

            <div class="formula">P(X = k) = C<sub>3</sub><sup>k</sup>(0,4)<sup>k</sup>(0,6)<sup>3-k</sup></div>

            <table class="table">
                <tr>
                    <th>X</th>
                    <th>0</th>
                    <th>1</th>
                    <th>2</th>
                    <th>3</th>
                </tr>
                <tr>
                    <td>P(X)</td>
                    <td>${format(pX0, 3)}</td>
                    <td>${format(pX1, 3)}</td>
                    <td>${format(pX2, 3)}</td>
                    <td>${format(pX3, 3)}</td>
                </tr>
            </table>

            <p>Перевірка:</p>
            <div class="formula">
                ${format(pX0, 3)} + ${format(pX1, 3)} + ${format(pX2, 3)} + ${format(pX3, 3)} = 1
            </div>

            <div class="answer">
                Відповідь: закон розподілу випадкової величини X наведено в таблиці.
            </div>
        `
    };

    function showTask(taskNumber) {
        taskContent.innerHTML = tasks[taskNumber];

        buttons.forEach(function (button) {
            if (button.dataset.task === String(taskNumber)) {
                button.classList.add("active");
            } else {
                button.classList.remove("active");
            }
        });
    }

    buttons.forEach(function (button) {
        button.addEventListener("click", function () {
            showTask(button.dataset.task);
        });
    });

    showTask(9);
});