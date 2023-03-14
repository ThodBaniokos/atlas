package gr.uoa.di.atlas.exception;

public class AuctionNotFoundException extends RuntimeException {

    public AuctionNotFoundException(Long id) {
        super("Could not find auction " + id);
    }
}