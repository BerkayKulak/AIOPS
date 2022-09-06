import memory_profiler
from memory_profiler import profile


# instantiating the decorator
@profile
# code for which memory has to
# be monitored
def my_func():
    import createPdfFile
    createPdfFile


if __name__ == '__main__':
    my_func()