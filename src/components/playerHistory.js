import { Card } from "@mui/material";
import Image from "next/image";
import { useEffect, useState } from "react";
import { getWeightedAverage } from "./playerCard";

export const PlayerHistory = ({ players }) => {
    const [visibleCards, setVisibleCards] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setVisibleCards((prev) => {
                const next = prev + 1;
                return next <= players.length ? next : prev;
            });
        }, 500);

        return () => clearInterval(interval);
    }, [players]);

    return (
        <div className="flex flex-wrap gap-2">
            {players.map((player, index) => {
                const weightedAverage = getWeightedAverage(player);
                return (
                    <Card
                        key={player.name}
                        className={`mb-2 p-2 fut-player-card fade-in ${index < visibleCards ? "fade-in-init" : "hide"
                            }`}
                        style={{
                            transition: "transform 0.5s ease",
                            transform: `translateX(${index < visibleCards ? "0" : "-100%"})`,
                            opacity: index < visibleCards ? 1 : 0,
                            zIndex: index < visibleCards ? 2 : 1,
                            position: "relative",
                            width: "150px",
                            height: "200px",
                            backgroundImage: `url("${player.gender === "female" ? "/fundoF.png" : "/fundoC2.png"
                                }")`,
                            backgroundPosition: "center center",
                            backgroundSize: "100% 100%",
                            backgroundRepeat: "no-repeat",
                            padding: "1.8rem 0",
                            backgroundColor: "transparent",
                            boxShadow: "none",
                        }}
                    >
                        <div className="fut-player-card1">
                            <div className="player-card-top1">
                                <div className="player-master-info">
                                    <div className="player-rating1">
                                        <span>{weightedAverage}</span>
                                    </div>
                                    <div className="player-position">
                                        <span>{player.position}</span>
                                    </div>
                                    <div>
                                        <Image
                                            src="https://upload.wikimedia.org/wikipedia/commons/0/05/Flag_of_Brazil.svg"
                                            alt="Brasil"
                                            width={20}
                                            height={50}
                                        />
                                    </div>
                                </div>
                                <div className="player-picture">
                                    <div className="logo">
                                        <Image
                                            src={player.imgURL}
                                            alt={player.name}
                                            width={300}
                                            height={200}
                                            style={{ width: "auto", height: "auto" }}
                                            priority={true}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="player-card-bottom">
                                <div className="player-info">
                                    <div className="player-name">
                                        <span>{player.name}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Card >
                )
            })}
        </div>
    );
};