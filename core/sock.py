import struct
import sys
class SocketCommunication:
    def recvall(self, conn, n):
        # Helper function to recv n bytes or return None if EOF is hit
        data = b''
        while len(data) < n:
            packet = conn.recv(n - len(data))
            if not packet:
                return None
            data += packet
        return data

    def send_data_bytes(self, conn, content):
        msg = struct.pack('>I', len(content)) + content
        size = conn.send(msg)
        return sys.getsizeof(msg)

    def send_data(self, conn, content):
        # Prefix each message with a 4-byte length (network byte order)
        # Send data to the server
        content = bytes(content, encoding="utf-8")
        msg = struct.pack('>I', len(content)) + content
        conn.send(msg)
        return sys.getsizeof(msg)

    def recv_data(self, conn):
        # Receive data from the server
        # Return result(an numpy array)
        resp_len = self.recvall(conn, 4)
        if not resp_len:
            return None
        resp_len = struct.unpack('>I', resp_len)[0]
        if not resp_len:
            return None
        result = self.recvall(conn, resp_len)
        result = result.decode("utf8")
        return eval(result)