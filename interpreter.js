const interpreter = () => {
    console.log('LOADED');

    const input = document.getElementById('I');
    const button = document.getElementById('KK');
    const output = document.getElementById('O');

    const mode = document.getElementById('_');
    const size = 30000;

    let list = {};
    let custom = ['にゃん', 'うみゃん', 'ぱおーん', 'ぐお', 'わん', 'みゃ〜', 'しゃー', 'くぅん'];
    '><+-.,[]'.split('').map((key, index) => list[key] = custom[index]);

    const runBF = code => {
        let memories = new Int32Array(size);
        let pointer = 0;
        let output = [];
    
        let tryMax = 10000;
        let tryCnt = 0;
    
        for (let i = 0, l = code.length; i < l; i ++) {
            tryCnt ++;
    
            switch (code[i]) {
                case '>':
                    pointer ++;
                    break;
    
                case '<':
                    pointer --;
                    break;
    
                case '+':
                    memories[pointer] ++;
                    break;
    
                case '-':
                    memories[pointer] --;
                    break;
    
                case '.':
                    output.push(String.fromCharCode(memories[pointer]));
                    break;
    
                case ',':
                    // nothing 😿
                    break;
    
                case '[':
                    if (memories[pointer] == 0) {
                        let c = 0;
    
                        while (!(c == 0 && code[i] == ']')) {
                            i ++;
    
                            if (code[i] == '[') c ++;
                            if (code[i] == ']' && c > 0) c --;
    
                            if (code.length < i) {
                                console.log('[ERROR] beyond scope memory.');
                                break;
                            }
                        }
                    }
                    break;
    
                case ']':
                    if (memories[pointer] != 0) {
                        let c = 0;
    
                        while (!(c == 0 && code[i] == '[')) {
                            i --;
    
                            if (code[i] == ']') c ++;
                            if (code[i] == '[' && c > 0) c --;
    
                            if (0 > i) {
                                console.log('[ERROR] beyond scope memory.');
                                break;
                            }
                        }
                    }
                    break;
            }
    
            if (tryCnt > tryMax) {
                console.log('[ERROR] Stack overflow tryMax');
                break;
            }
        }
    
        return {memories, output};
    };

    const toCustomBF = code => {
        let code_convert = '';

        code.split('').map(key => code_convert += list[key]);

        return code_convert;
    };
    
    const toNativeBF = code => {
        let stack = '';
        let code_convert = '';
    
        for (let i = 0, l = code.length; i < l; i ++) {
            stack += code[i];
    
            if (custom.includes(stack)) {
                code_convert += Object.keys(list)[custom.indexOf(stack)];
                stack = '';
            }
        }
    
        return code_convert || code;
    };

    button.addEventListener('click', () => {
        let code = input.value.split('\n').join('');

        switch (mode.value >> 0) {
            case 0:
                output.value = toCustomBF(code);
                break;

            case 1:
                output.value = toNativeBF(code);
                break;

            case 2:
                if (toNativeBF(code) != code) code = toNativeBF(code);
                let result = runBF(code);

                output.value = `OUTPUT:\n${result.output.join('')}\n\nMEMORIES:\n${result.memories.join('')}`;
                break;
        }

        if (output.value.includes('undefined')) output.value = '☠ERROR☠';
    });
}