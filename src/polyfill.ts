export async function connectPolyfill(
    address: SocketAddress | string,
    options?: SocketOptions,
  ): Promise<Socket> {
    if (navigator.userAgent === 'Cloudflare-Workers') {
      const { connect: cloudflareConnectImplementation } = await import(
        'cloudflare:sockets'
      );
      return cloudflareConnectImplementation(address, options);
    }
    const { connect: polyfillConnectImplementation } = await import('@arrowood.dev/socket');
    return polyfillConnectImplementation(address, options);
  }