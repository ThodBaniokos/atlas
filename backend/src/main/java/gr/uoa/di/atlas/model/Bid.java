package gr.uoa.di.atlas.model;

import lombok.Data;

import javax.persistence.*;
import java.util.Date;

@Data
@Entity
public class Bid implements Comparable<Bid> {

    private @Id
    @GeneratedValue Long id;

    @OneToOne
    private User bidder;

    private Date date;

    private Long amount;

    @Override
    public int compareTo(Bid bid) {
        if (this.getDate() == null || bid.getDate() == null) {
            return 0;
        }
        return this.getDate().compareTo(bid.getDate());
    }

}
