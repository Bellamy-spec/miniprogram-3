"""csv编码转utf-8的数据清洗脚本"""
import pandas as pd
import sys

# 获取csv文件名
fp = sys.argv[1]

# 获取文件扩展名
ed = fp.split('.')[-1]
if ed != 'csv':
    print('文件格式必须为csv')
    sys.exit()

# 获取纯文件名
fn = '.'.join(fp.split('.')[:-1])

# 进行转码处理
df = pd.read_csv(fp, encoding='gbk')
df.to_csv('{}_utf8.csv'.format(fn), encoding='utf-8', index=False)